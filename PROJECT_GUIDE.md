# AI-DASHBOARD Project Guide

Bu dosya, projenin buyurken ana mantigindan kopmamasini saglamak icin yazildi.
Amac: yeni ozellik eklenirken mimari sade, test edilebilir ve tutarli kalsin.

## 1. Projenin Amaci ve Kapsami

AI-DASHBOARD, AI platform yonetimi icin analytics odakli bir arayuzdur.
Su anki odak: Dashboard ekraninda mock verilerle saglikli bir UI/data akisi sunmak.

Cekirdek degerler:
- Hizi yuksek gelistirme dongusu (Vite + TS + React)
- Bilesen bazli parcali mimari
- Tip guvenligi
- Responsive ve tema destekli UI
- Gercek API'ye gecise hazir servis katmani

## 2. Mevcut Durum (Nisan 2026)

Calisan kisimlar:
- Ana route: `/` -> Dashboard
- Global provider zinciri: ThemeProvider + ToastProvider
- Dashboard veri bloklari: stats, revenue, traffic, performance, model usage, activity
- API katmani su an mock data + gecikme simulasyonu ile calisiyor
- Test altyapisi (Vitest + RTL) var, Dashboard testleri geciyor

Bilinen eksik/yarim kisimlar:
- Sidebar'da tanimli route'larin buyuk kismi henuz sayfa olarak yok
- Navbar search TODO asamasinda (sadece state tutuyor)
- Cogu veri kaynagi mock; backend entegrasyonu tamamlanmadi
- Testlerde gecen ama stderr'e dusen act ve chart size uyari notlari var

Bu nedenle proje "calisiyor ama urunlesmemis" durumunda.

## 3. Mimari Omurga (Kirilmamasi Gerekenler)

### 3.1 Uygulama iskeleti
- Giris: `src/main.tsx`
- App shell + routing: `src/App.tsx`
- Layout: `src/components/layout/MainLayout.tsx`
- Sayfa katmani: `src/pages/*`

Kural:
- Tum sayfalar MainLayout icinde render edilmeli.
- Global concern'ler (theme, toast gibi) context/provider katmaninda kalmali.

### 3.2 Klasor sorumluluklari
- `src/components/charts`: sadece chart sunumu
- `src/components/common`: dashboarda ozel tekrar kullanilan bloklar
- `src/components/ui`: framework-agnostic temel UI taslari
- `src/hooks`: tekrar kullanilan davranis mantigi
- `src/services`: HTTP/veri kaynagi adapter katmani
- `src/store`: app seviyesinde global state/context
- `src/types`: ortak tip kontratlari
- `src/utils`: saf yardimci fonksiyonlar

Kural:
- UI componentleri API cagirmamali.
- Sayfa ve hook katmani, service katmanindan veri almali.
- Tipler tek kaynaktan (`src/types`) yayilmali.

### 3.3 Veri akisi
Standart akis:
1. Page component -> service fonksiyonunu verir
2. `useFetch` hook'u async islemi yonetir
3. Hook `data/loading/error` dondurur
4. Page loading/error/empty/success branch'lerini cizer
5. Hata varsa toast ile kullaniciya bildirilir

Kural:
- Asenkron akislar tek pattern ile yonetilsin.
- Yeni veri bloklari ayni loading/error davranisini izlesin.

### 3.4 Theme ve UX durum yonetimi
- Tema kaynagi: `useTheme` + `ThemeProvider`
- Bildirim kaynagi: `ToastProvider`

Kural:
- Theme ve toast gibi cross-cutting concern'ler local state'e dagitilmasin.
- Bu concern'ler icin tek giris noktasi context hook'lari olmali.

## 4. Kod Standartlari ve Gelistirme Kurallari

### 4.1 TypeScript
- `any` kullanma; zorunluysa gerekce yorumu birak.
- Ortak veri modellerini `src/types/index.ts` uzerinden yonet.
- Service donus tipleri explicit olmali (`Promise<T>`).

### 4.2 React
- Sunum componentleri kucuk ve tek sorumlu kalmali.
- Hook'larda side-effect disina cikma.
- Gereksiz premature optimizasyondan kac (ozellikle gereksiz memoizasyon).

### 4.3 Stil/Tailwind
- Ortak stil desenlerini `index.css` utility/component katmaninda topla.
- Sayfa icinde uzun class tekrarlarini component level'da soyutla.
- Dark mode davranisini `html.dark` modeline sadik kal.

### 4.4 Dosya naming
- Bilesenler: PascalCase (`RevenueChart.tsx`)
- Hooklar: camelCase + `use` prefix (`useFetch.ts`)
- Yardimcilar: anlamli fiil isimleri (`formatCurrency`, `delay`)

## 5. Baska Gelistirici Ekibe Katildiginda Ilk 30 Dakika

1. `npm install`
2. `npm run dev`
3. Dashboard akislarini manuel kontrol et
4. `npm run test -- --run`
5. `src/pages/Dashboard.tsx` ve `src/services/api.ts` akisini oku
6. Sonra eklenecek ozelligi su sirayla planla:
   - Type
   - Service
   - Hook/Page entegrasyonu
   - Component
   - Test

## 6. Buyutme Plani (Saglam Sekilde)

### Faz 1: Route tamamlama
- Sidebar'daki her path icin sayfa olustur:
  - `/analytics`
  - `/models`
  - `/datasets`
  - `/team`
  - `/security`
  - `/notifications`
  - `/settings`

Kural:
- Her yeni sayfa en az bir smoke test ile gelmeli.

### Faz 2: Gercek API gecisi
- `apiClient` baseURL env'den beslensin.
- Mock/real switch mekanizmasi (feature flag) eklensin.
- Service katmaninda hata normalize edilsin.

Kural:
- UI tarafi backend detayini bilmemeli; sadece typed service fonksiyonu kullanmali.

### Faz 3: Domain modulasyonu
- Tek dashboard page buyudukce domain bazli bol:
  - metrics
  - performance
  - models
  - activity

Kural:
- Her domain kendi component + test + tip sinirina sahip olsun.

## 7. Done Kriterleri (PR Checklist)

Bir gelistirme "tamam" sayilmadan once:
- Lint temiz (`npm run lint`)
- Testler gecer (`npm run test -- --run`)
- Loading + empty + error + success state kontrol edildi
- Tema (light/dark) gorunumunde kritik bozulma yok
- Mobil (en az 390px) ve desktop (>=1280px) kontrol edildi
- Yeni tipler merkezi tipe eklendi
- Dokumantasyon gerekiyorsa bu dosya guncellendi

## 8. Teknik Borc ve Risk Defteri

Kisa vadeli riskler:
- Router ile sidebar path uyumsuzlugu kullanici deneyimini kirar
- Dashboard test stderr uyari gürultusu CI sinyalini bozar
- Mock data uzun sure kalirsa gercek entegrasyonda kirilim artar

Orta vadeli riskler:
- Dashboard sayfasi tek dosyada buyurse bakim maliyeti artar
- Context sayisi arttikca provider zinciri karmasiklasabilir

Azaltma stratejileri:
- Route coverage tablosu tut
- Test uyarilarini temizle (act wrapping, chart container mock)
- Domain bazli refactor'u geciktirme

## 9. Karar Kaydi Mantigi (ADR-Lite)

Mimariyi etkileyen her degisiklikte (ornek: state yonetim kutuphanesi degisikligi):
- Neden degisiklik gerekiyor?
- Hangi alternatifler degerlendirildi?
- Ne secildi ve neden?
- Geri donus maliyeti ne?

Bu kayitlar `docs/adr/` altinda tutulabilir.

## 10. Bu Dosyanin Bakim Kurali

Bu dosya statik bir README degildir, canli bir proje sozlesmesidir.

Guncelleme tetikleyicileri:
- Yeni route eklendi/silindi
- Veri akis patterni degisti
- Provider/state mimarisi degisti
- Test stratejisi degisti
- Build/deploy akisinda degisiklik oldu

Kural:
- Mimari davranisi degistiren her PR bu dosyayi da kontrol etmelidir.

---

Kisa ozet:
Bu projeyi bozmadan buyutmenin yolu, katman sorumluluklarini karistirmamak, tek bir veri akis desenine sadik kalmak, route/test kapsamini birlikte buyutmektir. Bu dosya, ekip buyudukce ortak teknik hafiza olarak kullanilmalidir.
