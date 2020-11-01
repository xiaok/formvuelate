import{g as a,f as n,I as s}from"./common-4b331bb8.js";const e='{"title":"FormVueLate 2.0 (Vue 3)","frontmatter":{},"headers":[{"level":2,"title":"Getting Started","slug":"getting-started"},{"level":3,"title":"Installation","slug":"installation"},{"level":2,"title":"Official plugins","slug":"official-plugins"},{"level":2,"title":"Core team","slug":"core-team"},{"level":2,"title":"Licence","slug":"licence"}],"lastUpdated":1604269170635.4783}';var t={};const o=s('<h1 id="formvuelate-2-0-vue-3"><a class="header-anchor" href="#formvuelate-2-0-vue-3" aria-hidden="true">#</a> FormVueLate 2.0 (Vue 3)</h1><p><img src="https://formvuelate.js.org/_assets/formvuelate-logo.0ce10a64.jpg" alt="FormVueLate Logo"></p><p><img src="https://img.shields.io/npm/v/formvuelate?color=42b883" alt="https://www.npmjs.com/package/formvuelate"><a href="https://plant.treeware.earth/formvuelate/formvuelate" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Treeware-%F0%9F%8C%B3-lightgreen" alt="Buy us a tree"></a></p><p>Visit <a href="https://formvuelate.js.org/#getting-started" target="_blank" rel="noopener noreferrer">FormVueLate 2.0&#39;s full documentation</a> for more detailed information and examples.</p><h2 id="getting-started"><a class="header-anchor" href="#getting-started" aria-hidden="true">#</a> Getting Started</h2><p>FormVueLate is a zero dependency library that allows you to generate schema-driven forms with extreme ease.</p><p>The schema that you use for your form can be as flexible as you need it to be, it can be modified at run-time with an expected reactive result, and can even be fetched directly from you backend’s API.</p><p><strong>Important</strong></p><p>FormVueLate is a bring-your-own-components library!</p><p>We do <em>not</em> provide any base components for your to build your forms. There are numerous component libraries out there that do a great job of providing carefully constructed components for you to use, and FormVueLate does a great job at allowing you to bring those external components to your forms, or even crafting your own.</p><h3 id="installation"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h3><p>To add FormVueLate to your project, start by installing the package through your favorite package manager.</p><div class="language-bash"><pre><code><span class="token function">yarn</span> <span class="token function">add</span> formvuelate\n// OR\n<span class="token function">npm</span> <span class="token function">install</span> formvuelate\n</code></pre></div><p>Now that you have the package in your project, <code>import</code> it to your component.</p><div class="language-javascript"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> SchemaForm <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;formvuelate&#39;</span>\n</code></pre></div><p>The <code>SchemaForm</code> requires two <code>props</code>. The first is the <code>schema</code>, which is the meta-data of your form. The second one is <code>modelValue</code>, which will hold the state of the form.</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SchemaForm</span> <span class="token attr-name">:schema</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>mySchema<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:modelValue</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>formData<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n</code></pre></div><p>The <code>SchemaForm</code> will <code>$emit</code> <strong>update:modelValue</strong> events when your components update. This means that you are able to either:</p><ul><li>use <code>v-model</code> on it</li><li>or, manually capture the <code>@update:modelValue</code> event with a method of your own while injecting the <code>:modelValue</code> property.</li></ul><p>Example with <code>v-model</code>:</p><div class="language-javascript"><pre><code><span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>\n  <span class="token operator">&lt;</span>SchemaForm <span class="token operator">:</span>schema<span class="token operator">=</span><span class="token string">&quot;mySchema&quot;</span> v<span class="token operator">-</span>model<span class="token operator">=</span><span class="token string">&quot;formData&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>\n<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>\n\n<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> formData <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token keyword">const</span> mySchema <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      <span class="token comment">// some schema here</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      formData<span class="token punctuation">,</span>\n      mySchema\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">}</span>\n<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>\n</code></pre></div><p>Example with manual bindings:</p><div class="language-javascript"><pre><code><span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>\n  <span class="token operator">&lt;</span>SchemaForm\n    <span class="token operator">:</span>schema<span class="token operator">=</span><span class="token string">&quot;mySchema&quot;</span>\n    <span class="token operator">:</span>modelValue<span class="token operator">=</span><span class="token string">&quot;formData&quot;</span>\n    @update<span class="token operator">:</span>modelValue<span class="token operator">=</span><span class="token string">&quot;updateForm&quot;</span>\n  <span class="token operator">/</span><span class="token operator">&gt;</span>\n<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>\n\n<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> formData <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token keyword">const</span> mySchema <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      <span class="token comment">// some schema here</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">const</span> <span class="token function-variable function">updateForm</span> <span class="token operator">=</span> <span class="token parameter">form</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n      formData <span class="token operator">=</span> form\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      formData<span class="token punctuation">,</span>\n      mySchema<span class="token punctuation">,</span>\n      updateForm\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">}</span>\n<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>\n</code></pre></div><h2 id="official-plugins"><a class="header-anchor" href="#official-plugins" aria-hidden="true">#</a> Official plugins</h2><h4 id="vuelidate-plugin"><a class="header-anchor" href="#vuelidate-plugin" aria-hidden="true">#</a> <a href="https://github.com/formvuelate/formvuelate-plugin-vuelidate" target="_blank" rel="noopener noreferrer">Vuelidate Plugin</a></h4><p>Easily incorporate Vuelidate powered validations into your forms.</p><h4 id="lookup-plugin"><a class="header-anchor" href="#lookup-plugin" aria-hidden="true">#</a> <a href="https://github.com/formvuelate/formvuelate-plugin-lookup" target="_blank" rel="noopener noreferrer">Lookup Plugin</a></h4><p>A mapping and replacement plugin to parse complex schemas into FormVueLate ready structure.</p><h2 id="core-team"><a class="header-anchor" href="#core-team" aria-hidden="true">#</a> Core team</h2><table><tr><td align="center"><a href="https://github.com/marina-mosti"><img src="https://avatars2.githubusercontent.com/u/14843771?s=460&amp;u=1d11d62c22d38c01d73e6c92587bd567f4e51d27&amp;v=4" width="120px;" alt="Marina Mosti"><br><sub><b>Marina Mosti</b></sub></a></td><td align="center"><a href="https://github.com/shentao"><img src="https://avatars3.githubusercontent.com/u/3737591?s=460&amp;u=6ef86c71bbbb74efae3c6224390ce9a8cba82272&amp;v=4" width="120px;" alt="Damian Dulisz"><br><sub><b>Damian Dulisz</b></sub></a></td><td align="center"><a href="https://github.com/tzhelyazkova"><img src="https://avatars0.githubusercontent.com/u/24877689?s=460&amp;u=3800bb7ec37a732fa56d47f097f8d2eaf2518f57&amp;v=4" width="120px;" alt="Tonina Zhelyazkova"><br><sub><b>Tonina Zhelyazkova</b></sub></a></td></tr></table><h2 id="licence"><a class="header-anchor" href="#licence" aria-hidden="true">#</a> Licence</h2><p>This package is <a href="https://treeware.earth" target="_blank" rel="noopener noreferrer">Treeware</a>. If you use it in production, then we ask that you <a href="https://plant.treeware.earth/formvuelate/formvuelate" target="_blank" rel="noopener noreferrer"><strong>buy the world a tree</strong></a> to thank us for our work. By contributing to the Treeware forest you’ll be creating employment for local families and restoring wildlife habitats.</p>',32);t.render=function(s,e){return n(),a("div",null,[o])};export default t;export{e as __pageData};