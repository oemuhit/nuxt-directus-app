<template>
  <div class="p-8 space-y-8">
    <h1 class="text-3xl font-bold mb-6">Typography (Prose) Classes Test</h1>
    
    <!-- prose-sm test -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">prose-sm</h2>
      <div class="prose prose-sm dark:prose-invert">
        <h3>Small Prose Heading</h3>
        <p>Bu küçük prose boyutunda bir paragraf. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <ul>
          <li>Liste öğesi 1</li>
          <li>Liste öğesi 2</li>
          <li>Liste öğesi 3</li>
        </ul>
      </div>
    </div>
    
    <!-- prose-base test -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">prose-base</h2>
      <div class="prose prose-base dark:prose-invert">
        <h3>Base Prose Heading</h3>
        <p>Bu temel prose boyutunda bir paragraf. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <blockquote>
          Bu bir blockquote örneği. Typography plugin'i ile güzel görünmelidir.
        </blockquote>
      </div>
    </div>
    
    <!-- prose-lg test -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">prose-lg</h2>
      <div class="prose prose-lg dark:prose-invert">
        <h3>Large Prose Heading</h3>
        <p>Bu büyük prose boyutunda bir paragraf. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <code>Bu bir kod örneği</code>
        <pre><code>Bu bir pre-formatted kod bloğu
console.log('Hello World!');</code></pre>
      </div>
    </div>
    
    <!-- prose-xl test -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">prose-xl</h2>
      <div class="prose prose-xl dark:prose-invert">
        <h3>Extra Large Prose Heading</h3>
        <p>Bu çok büyük prose boyutunda bir paragraf. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
    
    <!-- Responsive prose test -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Responsive Prose (md:prose-base lg:prose-lg)</h2>
      <div class="prose md:prose-base lg:prose-lg dark:prose-invert">
        <h3>Responsive Prose Heading</h3>
        <p>Bu responsive prose boyutunda bir paragraf. Ekran boyutuna göre değişir. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Test page for prose classes
definePageMeta({
  layout: 'default'
})
</script>