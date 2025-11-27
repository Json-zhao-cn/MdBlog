import{_ as e,c as s,b as a,o as i}from"./app-BBGgfQOx.js";const l={};function t(m,n){return i(),s("div",null,[...n[0]||(n[0]=[a(`<h2 id="c-common-datetime-extension-method" tabindex="-1"><a class="header-anchor" href="#c-common-datetime-extension-method"><span><strong>C# Common datetime extension method</strong></span></a></h2><h2 id="when-we-are-building-a-net-backend-platform-we-can-add-some-common-extension-method-in-our-platform-code-here-is-a-datatime-extension-code" tabindex="-1"><a class="header-anchor" href="#when-we-are-building-a-net-backend-platform-we-can-add-some-common-extension-method-in-our-platform-code-here-is-a-datatime-extension-code"><span>When we are building a .NET backend platform. We can add some common extension method in our platform code. Here is a datatime extension code.</span></a></h2><div class="language-c# line-numbers-mode" data-highlighter="prismjs" data-ext="c#" data-title="c#"><pre><code><span class="line">namespace Extenison</span>
<span class="line">{</span>
<span class="line">    public static class DateTimeExtension</span>
<span class="line">    {        </span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// Convert datetime to specific TimeZone UTC Time</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        /// &lt;param name=&quot;datetime&quot;&gt;&lt;/param&gt;</span>
<span class="line">        /// &lt;param name=&quot;timeZoneId&quot;&gt;&lt;/param&gt;</span>
<span class="line">        /// &lt;returns&gt;&lt;/returns&gt;</span>
<span class="line">        public static DateTime ConvertDateTimeToTimeZoneUtc(DateTime datetime,string timeZoneId)</span>
<span class="line">        {</span>
<span class="line">            return TimeZoneInfo.ConvertTimeFromUtc(datetime.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById(timeZoneId));</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// Convert datetime to Local time</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        /// &lt;param name=&quot;datetime&quot;&gt;&lt;/param&gt;</span>
<span class="line">        /// &lt;returns&gt;&lt;/returns&gt;</span>
<span class="line">        public static DateTime ConvertDateTimeToLocal(DateTime datetime)</span>
<span class="line">        {</span>
<span class="line">            return TimeZoneInfo.ConvertTime(datetime, TimeZoneInfo.Local);</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// Convert datetime to UTC time</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        /// &lt;param name=&quot;datetime&quot;&gt;&lt;/param&gt;</span>
<span class="line">        /// &lt;returns&gt;&lt;/returns&gt;</span>
<span class="line">        public static DateTime ConvertDateTimeToUTC(DateTime datetime)</span>
<span class="line">        {</span>
<span class="line">            return TimeZoneInfo.ConvertTime(datetime, TimeZoneInfo.Utc);</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">         /// &lt;summary&gt;</span>
<span class="line">        /// Convert DateTimeOffset to specific TimeZone UTC Time</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        /// &lt;param name=&quot;datetime&quot;&gt;&lt;/param&gt;</span>
<span class="line">        /// &lt;param name=&quot;timeZoneId&quot;&gt;&lt;/param&gt;</span>
<span class="line">        /// &lt;returns&gt;&lt;/returns&gt;</span>
<span class="line">        public static DateTime ConvertDateTimeOffsetToTimeZoneUtc(DateTimeOffset datetime,string timeZoneId)</span>
<span class="line">        {</span>
<span class="line">            return TimeZoneInfo.ConvertTimeFromUtc(datetime.UtcDateTime, TimeZoneInfo.FindSystemTimeZoneById(timeZoneId));</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// Convert DateTimeOffset to UTC time</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        /// &lt;param name=&quot;datetime&quot;&gt;&lt;/param&gt;</span>
<span class="line">        /// &lt;returns&gt;&lt;/returns&gt;</span>
<span class="line">        public static DateTime ConvertDateTimeOffsetToUTC(DateTimeOffset datetime)</span>
<span class="line">        {</span>
<span class="line">            return datetime.UtcDateTime;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// Convert DateTimeOffset to LocalDateTime</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        /// &lt;param name=&quot;datetime&quot;&gt;&lt;/param&gt;</span>
<span class="line">        /// &lt;returns&gt;&lt;/returns&gt;</span>
<span class="line">        public static DateTime ConvertDateTimeOffsetToLocal(DateTimeOffset datetime)</span>
<span class="line">        {</span>
<span class="line">            return datetime.LocalDateTime;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)])])}const c=e(l,[["render",t]]),r=JSON.parse('{"path":"/blogs/Skills/NET/Extension/DateTimeExtension.html","title":"C# Common datetime extension method","lang":"en-US","frontmatter":{"title":"C# Common datetime extension method","date":"2025/11/27","tags":["NET"],"categories":["Skills"]},"headers":[{"level":2,"title":"C# Common datetime extension method","slug":"c-common-datetime-extension-method","link":"#c-common-datetime-extension-method","children":[]},{"level":2,"title":"When we are building a .NET backend platform. We can add some common extension method in our platform code.Here is a datatime extension code.","slug":"when-we-are-building-a-net-backend-platform-we-can-add-some-common-extension-method-in-our-platform-code-here-is-a-datatime-extension-code","link":"#when-we-are-building-a-net-backend-platform-we-can-add-some-common-extension-method-in-our-platform-code-here-is-a-datatime-extension-code","children":[]}],"git":{"createdTime":1764230375000,"updatedTime":1764230375000,"contributors":[{"name":"jsonzhao","email":"json.zhao.cn@outlook.com","commits":1}]},"filePathRelative":"blogs/Skills/NET/Extension/DateTimeExtension.md"}');export{c as comp,r as data};
