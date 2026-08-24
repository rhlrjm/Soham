export const BLOGGER_THEME_XML_CODE = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsVersion='3' b:responsive='true' expr:dir='data:blog.languageDirection' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>

<!-- ======================================================
     SOAHAM - Spiritual & Meditation Blogger Theme
     Niche: Spirituality, Meditation & Self-Realization
     Publisher ID: ca-pub-3177625082355698
     Author: Samruddhi Rajam (Panvel, Maharashtra)
     ====================================================== -->

<head>
  <meta charset='UTF-8'/>
  <meta content='width=device-width, initial-scale=1, maximum-scale=5' name='viewport'/>
  <meta content='text/html; charset=UTF-8' http-equiv='Content-Type'/>
  <meta content='IE=edge' http-equiv='X-UA-Compatible'/>

  <b:if cond='data:blog.pageType == &quot;index&quot;'>
    <title><data:blog.pageTitle/></title>
    <meta expr:content='data:blog.pageTitle' name='keywords'/>
    <b:else/>
    <title><data:blog.pageName/> | <data:blog.title/></title>
  </b:if>

  <b:include data='blog' name='all-head-content'/>

  <!-- Google Fonts -->
  <link href='https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&amp;family=Tiro+Devanagari+Hindi:ital@0;1&amp;family=Cinzel:wght@400;600;700&amp;display=swap' rel='stylesheet'/>
  <link crossorigin='anonymous' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' rel='stylesheet'/>

  <!-- Google AdSense Auto Ads Script -->
  <script async='async' crossorigin='anonymous' src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3177625082355698'/>

  <b:skin><![CDATA[
  :root {
    --bg-deep: #050810;
    --bg-mid: #0a0f24;
    --bg-soft: #11182e;
    --text-primary: #e8eaf0;
    --text-secondary: #a8b0c4;
    --accent-purple: #8b5cf6;
    --accent-gold: #f6c453;
    --accent-blue: #4f9eff;
    --border-soft: rgba(255,255,255,0.08);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Hind', sans-serif;
    background: var(--bg-deep);
    color: var(--text-primary);
    line-height: 1.8;
  }
  a { color: var(--accent-blue); text-decoration: none; }
  .site-header {
    background: rgba(5,8,16,0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-soft);
    padding: 16px 20px;
    position: sticky; top: 0; z-index: 100;
  }
  .header-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
  .logo-box { display: flex; align-items: center; gap: 12px; }
  .logo-sym { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, #f6c453, #8b5cf6); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; color: #000; }
  .main-wrapper { max-width: 1200px; margin: 40px auto; padding: 0 20px; display: grid; grid-template-columns: 1fr 300px; gap: 30px; }
  .post-card { background: rgba(17,24,46,0.7); border: 1px solid var(--border-soft); border-radius: 12px; padding: 26px; margin-bottom: 24px; }
  .post-title { font-family: 'Cinzel', serif; font-size: 24px; color: var(--accent-gold); margin-bottom: 10px; }
  .footer { background: #02040a; border-top: 1px solid var(--border-soft); padding: 50px 20px 20px; margin-top: 60px; }
  @media(max-width: 768px) { .main-wrapper { grid-template-columns: 1fr; } }
  ]]></b:skin>
</head>

<body>
  <header class='site-header'>
    <div class='header-inner'>
      <a class='logo-box' expr:href='data:blog.homepageUrl'>
        <div class='logo-sym'>सो</div>
        <div>
          <h2 style='font-size:22px; color:#fff;'>Soaham</h2>
          <small style='color:#a8b0c4;'>शांतीची वाट — niranjan369</small>
        </div>
      </a>
      <nav>
        <a href='/p/about.html' style='margin-left:15px; color:#e8eaf0;'>About</a>
        <a href='/p/contact.html' style='margin-left:15px; color:#e8eaf0;'>Contact</a>
        <a href='/p/privacy-policy.html' style='margin-left:15px; color:#e8eaf0;'>Privacy</a>
      </nav>
    </div>
  </header>

  <div class='main-wrapper'>
    <main>
      <b:section id='main' showaddelement='no'>
        <b:widget id='Blog1' locked='true' title='Blog Posts' type='Blog' visible='true'>
          <b:includable id='main'>
            <b:loop values='data:posts' var='post'>
              <article class='post-card'>
                <h2 class='post-title'><a expr:href='data:post.url'><data:post.title/></a></h2>
                <div style='color:#6b7390; font-size:13px; margin-bottom:12px;'><data:post.date/> | <data:post.author/></div>
                <div style='color:#a8b0c4;'><b:eval expr='data:post.snippet'/></div>
              </article>
            </b:loop>
          </b:includable>
        </b:widget>
      </b:section>
    </main>
    <aside>
      <div style='background:rgba(17,24,46,0.7); border:1px solid var(--border-soft); border-radius:12px; padding:20px;'>
        <h3 style='color:var(--accent-gold); margin-bottom:15px;'>लेखिकेबद्दल</h3>
        <p style='color:#a8b0c4; font-size:14px;'>Samruddhi Rajam — पनवेल, महाराष्ट्र. ध्यान, आत्म-जाणीव, आणि अध्यात्मिक शिकवण.</p>
      </div>
    </aside>
  </div>

  <footer class='footer'>
    <div style='max-width:1200px; margin:0 auto; text-align:center; color:#6b7390; font-size:13px;'>
      © 2026 Soaham (niranjan369.blogspot.com). All rights reserved. | <a href='/p/privacy-policy.html'>Privacy Policy</a> | <a href='/p/disclaimer.html'>Disclaimer</a>
    </div>
  </footer>
</body>
</html>`;
