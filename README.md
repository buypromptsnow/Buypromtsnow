# PromptVault — GitHub Pages storefront

This folder is the **public website**. Upload these files/folders to the ROOT of your GitHub repository, not the paid ZIP files and not a parent folder containing this folder.

## What is already working

- Four themed product sections: 30 prompts each for Writing, Business, Creativity, and Productivity.
- The Complete Vault: 120 prompts across the four collections.
- Search/filter across **all 120 prompt titles** and view the included title list for each product.
- Four **real** complete prompts that users can switch between and copy.
- Free PDF/TXT sample downloads.
- Responsive layout for desktops and phones.
- Checkout button support for five **separate Payhip product links**.

The store does NOT generate prompts on demand. These are prewritten digital products. No payments are accepted until you activate the links and merchant account.

## 1. Put this site on GitHub Pages

1. Create a repository at https://github.com/new (example repository name: `promptvault-store`).
2. Extract `promptvault-github-pages.zip` on your computer.
3. Upload **the CONTENTS of that extracted folder** to your repository's root. You should see `index.html`, `css/`, `js/`, `assets/`, `.nojekyll`, and this README directly in the repository root.
4. Commit the files to the `main` branch.
5. In the repository go to **Settings → Pages → Build and deployment → Deploy from a branch** and choose `main` with folder `/(root)`, then Save.
6. Your URL will normally be `https://YOUR-USERNAME.github.io/promptvault-store/` (GitHub may take a short time to publish).

For a custom domain, configure it under **Settings → Pages → Custom domain** and follow GitHub's DNS instructions. You do **not** need hosting from your domain registrar.

## 2. Create the products in Payhip

These files are NOT in the public website ZIP. Get them from the **separate private** archive `promptvault-payhip-private.zip`. Upload each ZIP *inside Payhip only*.

| Product on this site | Payhip price | Upload to Payhip |
|---|---:|---|
| Writing & Communication | $29 | `writing-toolkit-PAYHIP.zip` |
| Business & Marketing | $49 | `business-toolkit-PAYHIP.zip` |
| Creativity & Content | $39 | `creativity-toolkit-PAYHIP.zip` |
| Productivity & Career | $29 | `productivity-toolkit-PAYHIP.zip` |
| Complete Vault | $99 | `complete-vault-PAYHIP.zip` |

Steps in Payhip:
1. Sign in at https://payhip.com/.
2. Connect your payment account and finish any merchant verification.
3. Add 5 **digital products** and upload the appropriate ZIP to each one.
4. Use the prices above, publish the listings, and confirm automated digital delivery is active.
5. Open **Products → Share / Embed** for each listing and copy that product's unique URL (often looks like `https://payhip.com/b/ABCDE`).

### 3. Connect the buttons (only one file to edit)

Edit `js/config.js` in GitHub. The five lines currently look like this:

```js
payhipLinks: {
  writing: "",
  business: "",
  creativity: "",
  productivity: "",
  complete: ""
}
```

Insert your OWN Payhip link between each pair of quotes. For example:

```js
writing: "https://payhip.com/b/YOUR_WRITING_KEY",
```

**Do not use the example string as a real link.** To go straight to Payhip checkout, you may use the unique product key from a URL like `https://payhip.com/b/ABCDE` to make a direct link like `https://payhip.com/buy?link=ABCDE`. Both types of URLs are supported by the website.

Optionally set `supportEmail` to a real support address. Until you add a real one, the Contact link is intentionally hidden.

Commit the change. Your GitHub Pages store buttons will then direct customers to the corresponding Payhip product or checkout page. Without valid Payhip links, the product details are visible but checkout is clearly disabled (no fake payment form).

## Important launch check

- [ ] Five Payhip digital products are published with the RIGHT corresponding ZIPs and prices.
- [ ] Merchant payouts and payment processor setup are completed in Payhip.
- [ ] `js/config.js` has **five working product links**.
- [ ] Click all five product buttons on GitHub Pages and verify they open the correct Payhip listing / checkout at the correct price.
- [ ] Use Payhip's test-purchase process or a legitimate small purchase to ensure successful file delivery.
- [ ] Add a real support email and appropriate refund, tax, digital delivery, and privacy terms in Payhip.
- [ ] Decide on your final brand/domain before buying it. `PromptVault` is a temporary working name, not trademark-cleared.

## Security / business notes

A public GitHub Pages repository is readable by everybody, including all uploaded assets. Do **not** upload the paid ZIPs, or even full paid text files, to GitHub. Payhip is responsible for access to the paid download after payment. Never put API keys, Stripe secret keys, passwords, or other private data in `js/config.js` or any public file.

This is a *static website*. It does not generate new prompts dynamically or process payments itself. No sales, earnings, or AI output quality are guaranteed.

Useful official documentation:
- GitHub Pages publication: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Payhip direct checkout links: https://help.payhip.com/article/126-direct-checkout-link
- Payhip product share URL: https://help.payhip.com/article/67-find-your-store-and-product-urls
