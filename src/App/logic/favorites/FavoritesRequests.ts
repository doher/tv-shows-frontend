export class FavoritesRequests {
  private active: AbortController | null = null;

  get pending() {
    return this.active !== null;
  }

  start() {
    this.active?.abort();
    this.active = new AbortController();
    return this.active.signal;
  }

  finish(signal: AbortSignal) {
    if (this.active?.signal !== signal) {
      return false;
    }

    this.active = null;
    return true;
  }

  cancel() {
    this.active?.abort();
    this.active = null;
  }
}
