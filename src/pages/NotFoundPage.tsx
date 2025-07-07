import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>Página no encontrada</p>
      <button onClick={handleBack}>
        VOLVER A INICIO
      </button>
    </div>
  );
};

export default NotFoundPage;