<template>
  <div :class="b()">
    <h1>Example</h1>
    <e-icon icon="styleguide-heart" width="100"/>
    <e-button type="submit"/>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <e-picture :sources="sources"
               :fallback="fallback"
               alt="an image"
               inline="true" />
    <e-picture :srcset="srcset"
               :sizes="sizes"
               :fallback="fallback"
               alt="an image"
               inline="true" />
    <e-picture :fallback="fallback"
               alt="an image"
               inline="true"/>
    <e-picture alt="an image"
               inline="true"/>
    <e-picture :sources="sources"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :srcset="srcset"
               :sizes="sizes"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :sources="sources"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :srcset="srcset"
               :sizes="sizes"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :sources="sources"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :srcset="srcset"
               :sizes="sizes"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :sources="sources"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :srcset="srcset"
               :sizes="sizes"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :sources="sources"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :srcset="srcset"
               :sizes="sizes"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :sources="sources"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :srcset="srcset"
               :sizes="sizes"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :sources="sources"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :srcset="srcset"
               :sizes="sizes"
               :fallback="fallback"
               alt="an image"/>
    <e-picture :srcset="srcset"
               :sizes="sizes"
               :sources="sources"
               :fallback="fallback"
               alt="an image"/>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      fallback: 'http://via.placeholder.com/180x150/0000ff',
      sources: {
        0: ['http://via.placeholder.com/180x150 1x', 'http://via.placeholder.com/360x300 2x'],
        1440: ['http://via.placeholder.com/1440x150 1x', 'http://via.placeholder.com/2880x300 2x'],
        800: ['http://via.placeholder.com/800x150 1x', 'http://via.placeholder.com/1600x300 2x'],
        sm: ['http://via.placeholder.com/350x150 1x', 'http://via.placeholder.com/700 2x'],
      },
      srcset: {
        180: 'http://via.placeholder.com/180x150',
        1440: 'http://via.placeholder.com/1440x150',
        800: 'http://via.placeholder.com/800x150',
        350: 'http://via.placeholder.com/350x150',
      },
      sizes: {
        1024: 500,
        xs: 250,
        md: 350,
      },
    })
  };
</script>

<style lang="scss"></style>
