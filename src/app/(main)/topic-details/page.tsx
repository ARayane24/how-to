"use client";
import { useEffect, useState } from "react";
import { XML } from "../../../utils/xml";
import { useSearchParams } from "next/navigation";
import LaravelApiClient from "@/api-clients/laravel_client";

export default function HomePage() {
  const [htmlContent, setHtmlContent] = useState("");
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");

  useEffect(() => {
    if (!topicId) return; // Prevent fetching if topicId is not available
    // API endpoint where the XML is fetched
    const xmlUrl = LaravelApiClient.baseUrl + "/api/v1/topics/" + topicId; // Replace with your XML API endpoint
    const xsltUrl = "/xslt/topic_page.xsl"; // Local or static XSLT file

    // Fetch and transform the XML from the API
    XML.transformXML(xmlUrl, xsltUrl)
      .then((result) => {
        setHtmlContent(result);
      })
      .catch((err) => console.error("Error transforming XML:", err));
  }, [topicId]);

  return (
    <div>
      {/* Render the HTML output from XSLT transformation */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
