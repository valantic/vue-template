/* eslint-disable */
export default [
  {
    componentName: 'c-swiper-hero',
    data: {
      images: [
        {
          imageUrl: 'http://via.placeholder.com/1600x500',
          fallback: 'http://via.placeholder.com/1600x500',
          href: 'http://www.google.ch',
        },
        {
          imageUrl: 'http://via.placeholder.com/1600x500',
          fallback: 'http://via.placeholder.com/1600x500',
          href: 'http://www.valantic.com',
        },
        {
          imageUrl: 'http://via.placeholder.com/1600x500',
          fallback: 'http://via.placeholder.com/1600x500',
          href: 'http://www.github.com',
        },
      ],
    },
  },
  {
    componentName: 'c-cms-text',
    data: {
      title: 'Example Text Component - Heading H1',
      text: '<p>Lorem ipsum dolor sit amet, consetetur <strong>sadipscing elitr</strong>, sed diam nonumy eirmod tempor <a href="#0" rel="noopener noreferrer" target="_blank">invidunt</a> ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et <a href="#0">justo</a> duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur <strong>sadipscing elitr</strong>, sed diam nonumy eirmod tempor <a href="#0" rel="noopener noreferrer" target="_blank">invidunt</a> ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et <a href="#0">justo</a> duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p><p>Lorem ipsum dolor sit amet, consetetur <strong>sadipscing elitr</strong>, sed diam nonumy eirmod tempor <a href="#0" rel="noopener noreferrer" target="_blank">invidunt</a> ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et <a href="#0">justo</a> duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur <strong>sadipscing elitr</strong>, sed diam nonumy eirmod tempor <a href="#0" rel="noopener noreferrer" target="_blank">invidunt</a> ut labore et dolore magna aliquyam erat, sed diam voluptua.&nbsp;</p><p>At vero eos et accusam et <a href="#0">justo</a> duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur <strong>sadipscing elitr</strong>, sed diam nonumy eirmod tempor <a href="#0" rel="noopener noreferrer" target="_blank">invidunt</a> ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et <a href="#0">justo</a> duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p><hr><p><em>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor <a href="#0" rel="noopener noreferrer" target="_blank">invidunt</a> ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et <a href="#0">justo</a> duo dolores et ea rebum. <u>Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</u></em></p><ol><li>Ordered list item</li><li>Ordered list item</li><li>Ordered list item</li></ol><ul><li>Unordered list item</li><li>Unordered list item</li><li>Unordered list item</li></ul><h2>Heading H2</h2><h3>Heading H3</h3><h4>Heading H4</h4><h4>Heading H5</h4><h6>Heading H6</h6><hr>',
    }
  },
  {
    componentName: 'c-cms-grid',
    data: {
      items: [
        {
          component: 'c-news-teaser',
          imageUrl: 'http://via.placeholder.com/700x300',
          href: '#',
          title: 'Lichtverschmutzung',
          text: 'Lichtimmission oder auch Lichtverschmutzung entsteht durch falsch ausgerichtete Leuchten.\n' +
          'Beispiele sind Strassenleuchten, die in nahegelegene Wohnungen strahlen, oder Städte, die den ' +
          'Nachthimmel stark erhellen.',
          innerSpacing: '700',
        },
        {
          component: 'c-news-teaser',
          imageUrl: 'http://via.placeholder.com/700x300',
          href: '#',
          title: 'Lichtverschmutzung',
          text: 'Lichtimmission oder auch Lichtverschmutzung entsteht durch falsch ausgerichtete Leuchten.\n' +
          'Beispiele sind Strassenleuchten, die in nahegelegene Wohnungen strahlen, oder Städte, die den ' +
          'Nachthimmel stark erhellen.',
          innerSpacing: '700',
        },
        {
          component: 'c-news-teaser',
          imageUrl: 'http://via.placeholder.com/700x300',
          href: '#',
          title: 'Lichtverschmutzung',
          text: 'Lichtimmission oder auch Lichtverschmutzung entsteht durch falsch ausgerichtete Leuchten.\n' +
          'Beispiele sind Strassenleuchten, die in nahegelegene Wohnungen strahlen, oder Städte, die den ' +
          'Nachthimmel stark erhellen.',
          innerSpacing: '700',
        },
      ],
      separationLine: true,
      borderBottom: 'gray',
    }
  },
  {
    componentName: 'c-cms-grid',
    data: {
      items: [
        {
          component: 'c-promotion-item',
          imageUrl: 'http://via.placeholder.com/700x300',
          href: '#',
          name: 'Frühlings Promotion',
        },
        {
          component: 'c-promotion-item',
          imageUrl: 'http://via.placeholder.com/700x300',
          href: '#',
          name: 'Frühlings Promotion',
        },
        {
          component: 'c-promotion-item',
          imageUrl: 'http://via.placeholder.com/700x300',
          href: '#',
          name: 'Frühlings Promotion.. with a longer title',
        },
      ],
      separationLine: true,
      borderBottom: 'yellow',
    }
  }
];
