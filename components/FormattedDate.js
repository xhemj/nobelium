import { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useConfig } from "@/lib/config";

dayjs.extend(localizedFormat);

const loaded = {};

export default function FormattedDate({ date }) {
  const lang = useConfig().lang.slice(0, 2);
  const [isLocaleLoaded, setIsLocaleLoaded] = useState(loaded[lang] === true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!isLocaleLoaded) {
      loaded[lang] ??= import(`dayjs/locale/${lang}`).then(
        () => {
          loaded[lang] = true;
          dayjs.locale(lang);
        },
        () => console.warn(`dayjs locale \`${lang}\` not found`)
      );
      loaded[lang].then(() => setIsLocaleLoaded(true));
    }
  }, [isLocaleLoaded, lang]);

  return isLocaleLoaded && isClient ? (
    <span>{dayjs(date).format("ll")}</span>
  ) : null;
}
