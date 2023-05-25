import {useRouter} from 'next/router'
import {useState, useEffect} from 'react';
import i18n from '@/i18n-config'

export default function LocaleSwitcher() {
  const router = useRouter();
  // state for current selection
  const [selected, setSelected] = useState(router.locale);
  useEffect(() => {
    setSelected(router.locale);
  })

  function handleLocaleChange(e) {
    const locale = e.target.value;
    router.push(router.asPath, router.asPath, {locale});
  }

  return (
      <select value={selected} onChange={handleLocaleChange}>
        {i18n.locales.map((locale, index) => (
          <option key={index} value={locale.code}>
            {locale.name}
          </option>
        ))}
      </select>
  )
}
