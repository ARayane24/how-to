export class XML {
  public static parseXML(xmlString: string): Document {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const errorNode = xmlDoc.getElementsByTagName("parsererror")[0];
    if (errorNode) {
      throw new Error("Error parsing XML: " + errorNode.textContent);
    }
    return xmlDoc;
  }

  public static async transformXML(
    xmlUrl: string,
    xsltUrl: string
  ): Promise<string> {
    const [xmlRes, xslRes] = await Promise.all([fetch(xmlUrl), fetch(xsltUrl)]);

    const xmlText = await xmlRes.text();
    const xslText = await xslRes.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");
    const xsl = parser.parseFromString(xslText, "text/xml");

    const xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);

    const resultDocument = xsltProcessor.transformToFragment(xml, document);
    return new XMLSerializer().serializeToString(resultDocument);
  }
}
