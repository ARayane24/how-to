<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Output as HTML -->
    <xsl:output method="html" encoding="UTF-8" indent="yes" />

    <xsl:template match="/topic">
        <html>
            <head>
                <title>
                    <xsl:value-of select="problem" />
                </title>
                <style>
                    .main_xslt{
                    color: white;
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    }
                    .topic_title{
                    font-size: 2em;
                    }
                    .steps_title{
                    font-size: 1.8em;
                    }
                    .step_title{
                    font-size: 1.6em;
                    }

                    .custom-hr {
                    border: none;
                    height: 3px;
                    background-color: #0070f3;
                    margin: 20px 0;
                    }

                </style>
            </head>
            <body>
                <h1 class="main_xslt topic_title">
                    <xsl:value-of select="problem" />
                </h1>
                <p class="main_xslt">
                    <xsl:value-of select="description" />
                </p>
                <p class="main_xslt">
                    <span> createdAt: <xsl:value-of select="createdAt" />
                    </span>
        | <span> updatedAt: <xsl:value-of select="updatedAt" />
                    </span>
                    <span> [<xsl:value-of
                            select="@id" />] </span>
                </p>

                <hr class="custom-hr" />
                <h2 class="main_xslt steps_title">Steps</h2>
                <ul class="main_xslt">
                    <xsl:for-each select="/topic/steps/step">
                        <li>
                            <h3 class="step_title">
                                <xsl:value-of select="title" />
                            </h3>
                            <p>
                                <xsl:value-of select="description" />
                            </p>
                            <p>
                                <xsl:value-of select="updatedAt" />
                                <xsl:value-of select="@id" />
                            </p>
                        </li>
                    </xsl:for-each>
                </ul>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>