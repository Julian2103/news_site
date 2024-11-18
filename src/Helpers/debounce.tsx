export const debounce = (
   fun: (event: React.KeyboardEvent<HTMLInputElement>) => void,
   delay: number
) => {
   let timer: number | NodeJS.Timeout;

   return function (event: React.KeyboardEvent<HTMLInputElement>) {
      if (timer) {
         clearTimeout(timer);
      }
      timer = setTimeout(() => fun(event), delay);
   };
};