import { defineComponent, computed, onMounted, ref, onUnmounted } from 'vue';

import { useStore } from '../../store';
import { Mutations } from '../../store/types';

import styles from './progress-bar.module.css';

export default defineComponent({
  name: 'ProgressBar',
  props: {},
  setup() {
    const store = useStore();
    const refreshTimeout = computed(
      (): number => store.state.refreshTimeoutInSeconds,
    );
    const progressBarAnimationDomElement = ref<HTMLElement | null>(null);
    const progressBarAnimation = ref<null | Animation>(null);
    const progressBarValue = ref(0);
    const intervalId = ref(-1);
    const storeSubscription = ref<() => void>();
    const animationKeyframes: Keyframe[] = [
      { transform: 'translateX(0%)' },
      { transform: 'translateX(100%)' },
    ];
    const animationOptions: KeyframeAnimationOptions = {
      duration: refreshTimeout.value * 1000,
      iterations: 1,
      easing: 'linear',
      delay: 0,
    };

    function startAnimation() {
      if (progressBarAnimation.value === null) {
        return;
      }

      progressBarAnimation.value.play();
    }

    function resetAnimation() {
      if (progressBarAnimation.value === null) {
        return;
      }

      progressBarAnimation.value.finish();
    }

    function updateProgressBarValues() {
      const timeoutInMS = refreshTimeout.value * 1000;
      const parts = 20;
      let step = 1;

      progressBarValue.value = 0;

      if (intervalId.value !== -1) {
        window.clearInterval(intervalId.value);
      }

      intervalId.value = window.setInterval(() => {
        progressBarValue.value = (100 / parts) * step;
        step += 1;
      }, timeoutInMS / parts);
    }

    storeSubscription.value = store.subscribe((mutation) => {
      if (mutation.type !== Mutations.UPDATE_CURRENT_DATE) {
        return;
      }

      resetAnimation();
      startAnimation();
      updateProgressBarValues();
    });

    onMounted(() => {
      if (progressBarAnimationDomElement.value === null) {
        throw new Error('progressBarAnimationDomElement not found');
      }

      if (!('animate' in HTMLElement.prototype)) {
        return;
      }

      progressBarAnimation.value = progressBarAnimationDomElement.value.animate(
        animationKeyframes,
        animationOptions,
      );

      progressBarAnimation.value.pause();
    });

    onUnmounted(() => {
      if (intervalId.value !== -1) {
        window.clearInterval(intervalId.value);
      }

      if (progressBarAnimation.value !== null) {
        progressBarAnimation.value.cancel();
      }

      if (storeSubscription.value !== undefined) {
        storeSubscription.value();
      }
    });

    return () => (
      <div class={styles.progressBar}>
        <div
          class={styles.progressBarElementInner}
          ref={progressBarAnimationDomElement}
        />
        <progress
          class={styles.progressBarElement}
          max="100"
          value={progressBarValue.value}
        >
          {progressBarValue.value}%
        </progress>
      </div>
    );
  },
});
