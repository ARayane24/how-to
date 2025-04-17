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
}
