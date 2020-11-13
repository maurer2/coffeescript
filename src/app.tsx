import { defineComponent, onMounted, onUnmounted, computed } from 'vue';
import styles from './app.module.css';
import AppFooter from './components/app-footer/app-footer';
import AppHeader from './components/app-header/app-header';
import ProgressBar from './components/progress-bar/progress-bar';
import QRCode from './components/qrcode';
import ListDaily from './components/list-daily';
import Menu from './components/menu/menu';

import { useStore } from './store';
import { Actions } from './store/types';

import './app.css';

export default defineComponent({
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    ProgressBar,
    ListDaily,
    Menu,
    'qr-code': QRCode,
  },
  props: {},
  setup() {
    const store = useStore();
    const refreshTimeout = computed(() => store.state.refreshTimeoutInMinutes as number);
    const dummyOrder: Order = {
      id: 'psl',
      name: 'PSL',
      dateTime: new Date(),
      tz: 'Europe/London',
    };
    let timeoutId = -1;

    function updateTime(): void {
      const newDate = new Date();

      store.dispatch(Actions.UPDATE_CURRENT_DATE, newDate);
    }

    function runUpdateTimer(): void {
      updateTime();

      timeoutId = window.setTimeout(() => {
        runUpdateTimer();
      }, refreshTimeout.value * 60 * 1_000);
    }

    function stopUpdateTimer(): void {
      window.clearTimeout(timeoutId);
    }

    onMounted(() => {
      // store.dispatch(Actions.ADD_ORDER, dummyOrder);

      runUpdateTimer();
    });

    onUnmounted(() => {
      stopUpdateTimer();
    });

    return () => (
      <>
        <app-header />
        <progress-bar />
        <main class={styles.main}>
          <qr-code />
          <list-daily />
          <Menu />
        </main>
        <app-footer />
      </>
    );
  },
});
