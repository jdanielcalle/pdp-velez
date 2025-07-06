import styles from './WhatsAppButton.module.scss';
import whatsappImg from '../../assets/whatsapp.png';

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/573113003425', '_blank');
  };

  return (
    <button className={styles.whatsappButton} onClick={handleClick}>
      <img src={whatsappImg} alt="WhatsApp" className={styles.icon} />
    </button>
  );
};

export default WhatsAppButton;
