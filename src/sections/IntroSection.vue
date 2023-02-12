<template>
  <section aria-label="Introduction">
    <h2 aria-label="Bio">Bio</h2>

    <p class="mb-ln">
      I write code as a hobby and also as a full-time job. Getting paid to do
      what I love feels pretty awesome. 10/10 would
      <em>definitely recommend</em>.
    </p>

    <p class="mb-ln">
      All the code I write for joy,
      <em>and most of what I write at work</em>, is open-source. It's all there
      on
      <Link
        dest="https://github.com/dhruvkb/"
        label="GitHub profile"
        :is-lowercase="false"
        >my GitHub profile</Link
      >. If you see something you like (<Link
        dest="https://github.com/dhruvkb/portfolio"
        label="Source code for this website"
        >including this site</Link
      >), consider starring. I'd appreciate that sweet dopamine. If you see
      something you don't like very much, consider filing an issue.
    </p>

    <p class="mb-ln">
      For <ProdPercent client:load />, I've worked on all aspects of software
      development, from planning to deployment, from backend to frontend, and
      everything in between. I've even dabbled a little bit in UX/UI design and
      feel like I'm <em>pretty good</em> at it, but you're free to judge for
      yourself. For context, I designed this site.
    </p>
  </section>
</template>
