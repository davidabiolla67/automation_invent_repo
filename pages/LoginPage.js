export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByTestId('login-email');
        this.passwordInput = page.getByTestId('login-password');
        this.loginButton = page.getByTestId('login-button');
    }

    async navigate() {
        await this.page.goto('/index.html');
    }

    async login(credentials) {
        await this.emailInput.fill(credentials.email);
        await this.passwordInput.fill(credentials.password);
        await this.loginButton.click();
    }
}
 