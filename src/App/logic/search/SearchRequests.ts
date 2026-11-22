const DEBOUNCE_MS = 350;

export class SearchRequests {
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

  finish(signal: AbortSignal) {
    if (this.active?.signal === signal) {
      this.active = undefined;
    }
  }

  cancel() {
    clearTimeout(this.debounceTimer);
    this.active?.abort();
    this.active = undefined;
  }
}
