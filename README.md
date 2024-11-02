# AI1894S - Accelerate with AI: Build your own GitHub Copilot Extension

Welcome to our workshop materials! Below are the steps we'll be walking through to build your own Copilot Extension.

A continued discussion is available [here](https://github.com/orgs/community/discussions/142312) and thank you for attending!

## Workshop steps

1. Open up [github.com](https://github.com) and let's go!

### Create a Copilot App

1. Navigate to **Settings**
2. Navigate to **Developer Settings**
3. Click **New GitHub App**
4. Fill in `Name` and `Homepage URL`. Note, `Homepage URL` is arbitrary and we'll be using `https://github.com` for this demo.
5. Uncheck `Active` in the **Webhooks** section
6. Under **Permissions**, expand **Account Permissions** and set **Copilot Chat** to `read-only`.
7. Click **Create GitHub App**
8. Copy `Client ID` as we'll need this later

### Open a Codespace

1. Open a new browser tab with [github.com](https://github.com)
2. Choose the `ghusai1894` from the context drop down
3. Visit our test repo via the announcement or by browsing this organization's repos
4. Click **Code**
5. Click the **Codespaces** tab
6. Click **Create codespace on main**
7. Success! You should now be viewing our test repo in a web-based VS Code editor

### Configure Copilot App and environment

1. In the VS Code view, navigate to `src/index.html`
2. Replace `CLIENT_ID` with the **Client ID** you copied in step 8 of [Create a Copilot App](#create-a-copilot-app)
3. In the VS Code terminal, run `npm i`
4. In the VS Code terminal, run `npm start`
5. Click **Make Public** in the popup that appears
6. Navigate to the **Ports** tab in VS Code
7. Copy the `Forwarded Address`
8. Paste this value into the `Callback URL` field of your GitHub App of [Create a Copilot App](#create-a-copilot-app)
9. Add `/authorize` to the end of the `Callback URL`
10. Click **Save changes**
11. Scroll up and navigate to the **Copilot** tab
12. Agree to the developer terms
13. Select `agent` for **App Type**
14. Paste the `Forwarded Address` into the `URL` field
15. Type `Hello world` into the `Inference Description` field

### Try it out!

1. Navigate to the Codespace tab
2. In the **Ports** tab, within VS Code, click the **web** icon or copy and paste the `Forwarded Address` into a new tab
3. Click **Continue** on the warning about visiting a Codespace-hosted URL
4. Click **Let's Authorize An App!**
5. Click **Authorize** on the GitHub review page
6. Click **All set! Now back to GitHub!**
7. Open Copilot Chat on [github.com](https://github.com) and select **General Purpose Chat**
8. Type `@YOURAGENT hi!`
9. Give yourself a round of applause!
