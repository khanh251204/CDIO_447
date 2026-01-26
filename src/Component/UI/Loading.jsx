import styles from './Loading.module.css';
export const Loading = () => {
    return (
        <div className={styles.loadingOverlay}>
            <div className={styles.spinnerMexicanWave}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

    );
}