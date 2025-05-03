<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/topic">
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>
          <xsl:value-of select="problem" />
        </title>
        <style>
          body {
            background-color: #1a1a1a;
            margin: 0;
            padding: 0;
          }

          .main_xslt {
            color: white;
            font-family: Arial, sans-serif;
            padding: 40px;
            max-width: 900px;
            margin: 0 auto;
            line-height: 1.6;
          }

          .topic_title {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: bold;
          }

          .steps_title {
            font-size: 2em;
            margin-top: 40px;
            margin-bottom: 20px;
            font-weight: bold;
          }

          .step_title {
            font-size: 1.5em;
            margin: 20px 0 10px 0;
            font-weight: bold;
          }

          .custom-hr {
            border: none;
            height: 3px;
            background-color: #0070f3;
            margin: 30px 0;
            border-radius: 2px;
          }

          .p-l {
            padding-left: 15px;
            margin-bottom: 10px;
          }

          .date {
            font-size: 0.9em;
            color: #c0ddff;
            direction: rtl;
            text-align: right;
            margin-top: 10px;
            margin-bottom: 20px;
          }

          .mysteps {
            padding-left: 20px;
          }

          .mystep {
            background-color: #2a2a2a;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          }
        </style>
      </head>

      <body>
        <div class="main_xslt">
          <h1 class="topic_title">Problem: <xsl:value-of select="problem" /></h1>

          <p>
            <xsl:value-of select="description" />
          </p>

          <p class="date">
            <span>Created At: <xsl:value-of select="createdAt" /></span> |
            <span>Updated At: <xsl:value-of select="updatedAt" /></span> |
            <span>[<xsl:value-of select="@id" />]</span>
          </p>

          <hr class="custom-hr" />

          <h2 class="steps_title">Steps</h2>

          <ul class="mysteps">
            <xsl:for-each select="/topic/steps/step">
              <li class="mystep">
                <h3 class="step_title">
                  <xsl:value-of select="title" />
                </h3>

                <p class="p-l">
                  <xsl:value-of select="description" />
                </p>

                <p class="date">
                  Updated At: <xsl:value-of select="updatedAt" /> 
                  [<xsl:value-of select="@id" />]
                </p>
              </li>
            </xsl:for-each>
          </ul>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
