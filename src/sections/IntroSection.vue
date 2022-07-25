<script setup lang="ts">
  import ReferenceIndex from '@/components/ReferenceIndex.vue'
</script>

<template>
  <section
    class=""
    aria-label="Introduction">
    <h2 aria-label="Bio">
      Bio
    </h2>

    <div class="max-w-screen-lg">
      <p class="body-text mb-6">
        I <strong>write code</strong> as a hobby and also as a full-time job. Getting paid to do what
        I love feels pretty awesome.
        <ReferenceIndex
          class="align-top"
          :index="1" />
      </p>
      <p class="note-para mb-12">
        <ReferenceIndex :index="1" />
        💯 Would definitely recommend.
      </p>

      <p class="body-text mb-6">
        All the code I write for myself, and most of what I write at work, is
        <strong>open-source</strong>. You can see all of it on
        <Link
          dest="https://github.com/dhruvkb/"
          label="GitHub profile"
          is-plain>
          my GitHub profile
        </Link>.
        <ReferenceIndex
          class="align-top"
          :index="2" />
      </p>
      <p class="note-para mb-12">
        <ReferenceIndex :index="2" />
        If you see something you like (<Link
          dest="https://github.com/dhruvkb/portfolio"
          label="Source code for this website"
          is-plain>
          including this site
        </Link>), I encourage you to fork it.
      </p>

      <p class="body-text mb-6">
        For over half my life, I've worked on <strong>all aspects</strong> of software development,
        from planning to deployment, from backend to frontend, and everything in between. I've even
        dabbled a little bit in UX/UI design.
        <ReferenceIndex
          class="align-top"
          :index="3" />
      </p>
      <p class="note-para mb-12">
        <ReferenceIndex :index="3" />
        Judge for yourself, I designed this site.
      </p>

      <p class="body-text">
        I'm always open to collaborating on new and exciting ideas. If you have one, let's connect. My
        name is <strong>Dhruv Bhanushali</strong>.
      </p>
    </div>
  </section>
</template>

<style lang="css">
  .note-para {
    @apply text-sm;
  }
</style>
