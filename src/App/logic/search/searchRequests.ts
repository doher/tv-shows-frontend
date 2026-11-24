const DEBOUNCE_MS = 350;

class SearchRequests {
  private debounceTimer?: ReturnType<typeof setTimeout>;
  private active?: AbortController;

  schedule(search: () => void) {
    this.cancel();
    this.debounceTimer = setTimeout(search, DEBOUNCE_MS);
  }

  start() {
    this.cancel();
    this.active = new AbortController();
    return this.active.signal;
  }

  cancel() {
    clearTimeout(this.debounceTimer);
    this.active?.abort();
    this.active = undefined;
  }
}

export const searchRequests = new SearchRequests();
