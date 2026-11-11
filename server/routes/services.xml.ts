import { siteData } from "~/data";

export default defineEventHandler((event) => {
  const baseUrl = siteData.siteUrl;
  const currentDate = new Date().toISOString();

  const servicesXml = siteData.services
    .map((service, index) => {
      const id = index + 1;
      const priceNumber =
        service.fromPrice === "Бесплатно"
          ? "0"
          : service.fromPrice.replace(/[^\d]/g, "") || "0";

      const title = service.title.toLowerCase();
      let category = "Строительные работы";

      if (
        title.includes("осмотр") ||
        title.includes("консультац") ||
        title.includes("замер")
      ) {
        category = "Консультация";
      } else if (
        title.includes("квартир") ||
        title.includes("комнат") ||
        title.includes("офис")
      ) {
        category = "Ремонт помещений";
      } else if (title.includes("дизайн")) {
        category = "Дизайн интерьера";
      } else if (title.includes("электро")) {
        category = "Электромонтаж";
      } else if (title.includes("сануз")) {
        category = "Санузел под ключ";
      }

      return `    <service id="${id}">
      <name>${escapeXml(service.title)}</name>
      <category>${escapeXml(category)}</category>
      <price>${priceNumber}</price>
      <price_display>${escapeXml(service.fromPrice)}</price_display>
      <currency>RUB</currency>
      <description>${escapeXml(service.description)}</description>
      <url>${baseUrl}/#services</url>
      <availability>available</availability>
      ${service.highlight ? "<featured>true</featured>" : ""}
    </service>`;
    })
    .join("\n    \n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<services>
  <company>
    <name>${escapeXml(siteData.brandName)}</name>
    <description>Профессиональный ремонт, дизайн и строительные работы в Барнауле и Алтайском крае.</description>
    <city>${escapeXml(siteData.city)}</city>
    <phone>${escapeXml(siteData.phone)}</phone>
    <website>${baseUrl}</website>
    <work_hours>${escapeXml(siteData.workHours)}</work_hours>
    <response_time>${escapeXml(siteData.response)}</response_time>
    <service_area>${escapeXml(siteData.address)}</service_area>
  </company>
  
  <service_list>
${servicesXml}
  </service_list>
  
  <categories>
    <category id="consultation">Консультация</category>
    <category id="renovation">Ремонт помещений</category>
    <category id="design">Дизайн интерьера</category>
    <category id="electric">Электромонтаж</category>
    <category id="bathroom">Санузел под ключ</category>
    <category id="general">Строительные работы</category>
  </categories>
  
  <generated_at>${currentDate}</generated_at>
</services>`;

  setResponseHeader(event, "Content-Type", "application/xml; charset=utf-8");
  setResponseHeader(event, "Cache-Control", "public, max-age=3600");

  return xml;
});

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
