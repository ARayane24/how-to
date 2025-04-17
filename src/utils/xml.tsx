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

  public static transformXML = async (xmlUrl: string, xsltUrl: string) => {
    // Fetch XML and XSLT files from the API and the XSLT file location
    const [xmlResponse, xsltResponse] = await Promise.all([
      fetch(xmlUrl), // API endpoint to fetch XML data
      fetch(xsltUrl), // Path to XSLT file (this could be static or an endpoint)
    ]);

    const xmlText = await xmlResponse.text();
    const xsltText = await xsltResponse.text();

    // Parse the XML and XSLT into DOM objects
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    const xsltDoc = parser.parseFromString(xsltText, "application/xml");

    // Apply the XSLT transformation
    const xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsltDoc);

    const resultDoc = xsltProcessor.transformToDocument(xmlDoc);

    // Return the resulting HTML string
    return new XMLSerializer().serializeToString(resultDoc);
  };
}
