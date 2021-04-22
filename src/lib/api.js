// For some reason, Reddit API really doesn't want to work on
// local development machine. So we're proxying it.
export let BASE_URL = import.meta.env.DEV
  ? 'https://reddit-proxy.intrnl.workers.dev'
  : 'https://www.reddit.com';

export let FEED_SORT = ['hot', 'new', 'top', 'rising'];
