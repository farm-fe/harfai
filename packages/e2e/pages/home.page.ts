import type { Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  get heading() {
    return this.page.getByRole('heading', { level: 1 });
  }

  get usersLink() {
    return this.page.getByRole('link', { name: /view users/i });
  }
}
