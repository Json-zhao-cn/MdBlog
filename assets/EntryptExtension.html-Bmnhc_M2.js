import{_ as s,c as e,b as a,o as i}from"./app-BBGgfQOx.js";const l={};function t(r,n){return i(),e("div",null,[...n[0]||(n[0]=[a(`<h2 id="c-encryprtextenison-method" tabindex="-1"><a class="header-anchor" href="#c-encryprtextenison-method"><span><strong>C# EncryprtExtenison method</strong></span></a></h2><p>When we are building a .NET backend platform. We can add some common extension method in our platform code. Here is a encryprt extension code. We can add some md5,hash... EncryprtExtenison to <code>encryption</code> and <code>decryption</code>.</p><div class="language-c# line-numbers-mode" data-highlighter="prismjs" data-ext="c#" data-title="c#"><pre><code><span class="line">using System.Reflection.Metadata.Ecma335;</span>
<span class="line">using System.Security.Cryptography;</span>
<span class="line"></span>
<span class="line">namespace Extenison</span>
<span class="line">{</span>
<span class="line">    public static class EncryprtExtenison</span>
<span class="line">    {</span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// Generate hashed string</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        /// &lt;param name=&quot;dataString&quot;&gt;String for hashing&lt;/param&gt;</span>
<span class="line">        /// &lt;returns&gt;Return hashed string&lt;/returns&gt;</span>
<span class="line">        public static string ApplyHash(string dataString)</span>
<span class="line">        {</span>
<span class="line">            byte[] messageBytes = Encoding.UTF8.GetBytes(dataString);</span>
<span class="line"></span>
<span class="line">            byte[] hashValue = SHA256.HashData(messageBytes);</span>
<span class="line"></span>
<span class="line">            return $&quot;$2a$10\${Convert.ToHexString(hashValue)}&quot;;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// Generate hashed string</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        /// &lt;param name=&quot;dataString&quot;&gt;String for hashing&lt;/param&gt;</span>
<span class="line">        /// &lt;returns&gt;Return hashed string&lt;/returns&gt;</span>
<span class="line">        public static bool TryApplyHash(string dataString,out string EncryptData)</span>
<span class="line">        {</span>
<span class="line">            byte[] messageBytes = Encoding.UTF8.GetBytes(dataString);</span>
<span class="line"></span>
<span class="line">            byte[] hashValue = SHA256.HashData(messageBytes);</span>
<span class="line"></span>
<span class="line">            EncryptData= $&quot;$2a$10\${Convert.ToHexString(hashValue)}&quot;;</span>
<span class="line">            return true;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)])])}const d=s(l,[["render",t]]),p=JSON.parse('{"path":"/blogs/Skills/NET/Extension/EntryptExtension.html","title":"C# Common Encryprt Extenison method","lang":"en-US","frontmatter":{"title":"C# Common Encryprt Extenison method","date":"2025/11/27","tags":["NET"],"categories":["Skills"]},"headers":[{"level":2,"title":"C# EncryprtExtenison method","slug":"c-encryprtextenison-method","link":"#c-encryprtextenison-method","children":[]}],"git":{"createdTime":1764230375000,"updatedTime":1764230375000,"contributors":[{"name":"jsonzhao","email":"json.zhao.cn@outlook.com","commits":1}]},"filePathRelative":"blogs/Skills/NET/Extension/EntryptExtension.md"}');export{d as comp,p as data};
