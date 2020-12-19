import {
  defineComponent,
  ref,
  onMounted,
  PropType,
  computed,
  watch,
  onBeforeMount,
} from 'vue';
import QRCodeGenerator, { QRCodeToStringOptions } from 'qrcode';
import styles from './qrcode-figure.module.css';
import { useStore } from '../../../store';

export default defineComponent({
  name: 'QRCodeFigure',
  props: {
    userId: {
      type: String as PropType<string>,
      default: '',
    },
    zoomLevel: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props, { slots }) {
    const store = useStore();
    const isBlocked = computed((): boolean => store.getters.isBlocked);
    const qrCodeMarkup = ref<string | undefined>(undefined);
    const qrCodeColorBlocked = ref<string>('#00000');
    const qrCodeSettings: QRCodeToStringOptions = {
      errorCorrectionLevel: 'H',
      type: 'svg',
      margin: 0,
      color: {
        dark: '#000',
        light: '#fff',
      },
    };

    async function getQRCodeMarkup(payload: string): Promise<string> {
      const settings = qrCodeSettings;
      const qrCodeString = QRCodeGenerator.toString(payload, settings);

      return qrCodeString;
    }

    async function setQRCodeMarkup(): Promise<void> {
      try {
        const markup = await getQRCodeMarkup(props.userId);

        qrCodeMarkup.value = markup;
      } catch (error) {
        console.log(error);
      }
    }

    onBeforeMount(() => {
      qrCodeColorBlocked.value = getComputedStyle(
        document.documentElement,
      ).getPropertyValue('--concrete');
    });

    onMounted(
      async (): Promise<void> => {
        try {
          setQRCodeMarkup();
        } catch (error) {
          console.log(error);
        }
      },
    );

    watch(isBlocked, () => {
      setQRCodeMarkup();
    });

    return () => {
      const { zoomLevel, userId } = props;

      return (
        <>
          {qrCodeMarkup.value ? (
            <figure class={styles.qrcodePicture}>
              <div
                class={styles.qrcodeImageWrapperOuter}
                style={{
                  width: `calc(50vw * ${zoomLevel})`,
                }}
              >
                {slots.default !== undefined ? slots.default() : null}
                <div
                  class={styles.qrcodeImageWrapper}
                  innerHTML={qrCodeMarkup.value}
                />
              </div>
              <figcaption class={styles.qrcodeText}>{userId}</figcaption>
            </figure>
          ) : (
            <div class={styles.qrcodeLoader}>Loading</div>
          )}
        </>
      );
    };
  },
});
