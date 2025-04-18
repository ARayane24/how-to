<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Output as HTML -->
    <xsl:output method="html" encoding="UTF-8" indent="yes" />

    <xsl:template match="/topic">
        <html>
            <head>
                <meta charset="UTF-8" />
                <title>
                    <xsl:value-of select="problem" />
                </title>
                <style>
                    .main_xslt{
                    color: white;
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    margin-left:30px;
                    margin-right:20px;
                    }
                    .topic_title{
                    font-size: 2em;
                    }
                    .steps_title{
                    font-size: 1.8em;
                    }
                    .step_title{
                    font-size: 1.6em;
                    margin-top:10px;
                    }

                    .custom-hr {
                    border: none;
                    height: 3px;
                    background-color: #0070f3;
                    margin: 20px 0;
                    }
                    .p-l{
                    padding-left: 20px
                    }
                    .date{
                    font-size: 0.8em;
                    color: #c0ddff;
                    direction: rtl;
                    align-self: end;
                    }
                </style>
            </head>
            <body>
                <h1 class="main_xslt topic_title"> Problem: <xsl:value-of select="problem" />
                </h1>
                <p class="main_xslt">
                    <xsl:value-of select="description" />
                </p>
                <p class="main_xslt date">
                    <span>Created At: <xsl:value-of select="createdAt" /></span> | <span>Updated At: <xsl:value-of
                            select="updatedAt" /></span> | <span>[<xsl:value-of select="@id" />]</span>
                </p>

                <hr class="custom-hr" />
                <h2 class="main_xslt steps_title">Steps</h2>
                <ul class="main_xslt">
                    <xsl:for-each select="/topic/steps/step">
                        <li style="
    display: flex;
    flex-direction: column;
">
                            <h3 class="step_title">
                                <xsl:value-of select="title" />
                            </h3>
                            <p class="main_xslt p-l">
                                <xsl:value-of select="description" />
                            </p>
                            <p class="date"> Updated At : <xsl:value-of select="updatedAt" /> [<xsl:value-of
                                    select="@id" />] </p>
                        </li>
                    </xsl:for-each>
                </ul>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>