export const formatDate = (timestamp) => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${month} ${day}, ${year} - ${formattedHours}:${formattedMinutes} ${ampm}`;
}


const dateOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const timeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true
};

export const formatDate2 = datetime => {
  let date = new Date(datetime);
  const formattedDate = date.toLocaleDateString('es', dateOptions);
  const formattedTime = date.toLocaleTimeString('es', timeOptions);

  return `${formattedDate} - ${formattedTime}`;
}

export const formattedDate = timestamp => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Devuelve la cadena en el formato deseado
  return `${day}${month}${year}_${hours}${minutes}${seconds}`;
}
