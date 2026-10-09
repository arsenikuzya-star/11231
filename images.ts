// 🖼️ ХАБ ВСЕХ КАРТИНОК САЙТА
import heroBanner from '../assets/hero-banner.jpg';
import showroomPanels from '../assets/showroom-panels.jpg';
import bgTexture from '../assets/bg-dark.jpg';

// Ссылки на ваши фото (замените на файлы в src/assets/steps/ при скачивании)
const step1 = 'https://files.vibecraft.ai/v1/main/user-attachments/395648604724838400/52c6f663-8a30-49e0-82a1-12c8b09312b9.png';
const step2 = 'https://files.vibecraft.ai/v1/main/user-attachments/395648604724838400/2281a4d7-0105-4c07-b353-294b05bca4d0.png';
const step3 = 'https://files.vibecraft.ai/v1/main/user-attachments/395648604724838400/9815049c-f127-46ba-a1c2-95995cf580c8.png';
const step4 = 'https://files.vibecraft.ai/v1/main/user-attachments/395648604724838400/1202cece-4927-4595-950e-a616231c518b.png';
const step5 = 'https://files.vibecraft.ai/v1/main/user-attachments/395648604724838400/781076b4-2139-4d69-b541-15582f3c7608.png';
const step6 = 'https://files.vibecraft.ai/v1/main/user-attachments/395648604724838400/3932822a-f903-4c54-9467-f10bcbe6d859.png';

export const images = {
  hero: heroBanner,
  showroom: showroomPanels,
  background: bgTexture,
  steps: [step1, step2, step3, step4, step5, step6],
};
