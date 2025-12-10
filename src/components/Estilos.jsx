export const coresDeFundo = (main) => {
  switch(main) {
    case "Clear": return "#4DB6FF";      // Azul limpo vibrante
    case "Clouds": return "#B0BEC5";     // Cinza suave e elegante
    case "Rain": return "#8AB6D6";       // Azul chuvoso agradável
    case "Thunderstorm": return "#455A64"; // Cinza escuro moderno
    case "Snow": return "#F5FAFF";       // Branco azulado suave
    default: return "#E0E0E0";           // Neutro
  }
};
