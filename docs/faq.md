# Handy Pet FAQ

## What is Handy Pet?

Handy Pet is a pet health record app for organizing vaccinations, weight entries, vet visits, medications, medical records, reminders, documents, and other information for your pets.

## Do I need an account?

Yes. You must sign in to use the app. Signing in also backs up your pet data and allows it to sync across devices.

## How can I create or access an account?

You can:

- Create an account with an email address and password.
- Sign in or register with Google.

If you forget an email-account password, choose **Forgot password?** on the sign-in sheet. Handy Pet sends a reset link without revealing whether an account exists. If you created the account with Google, use **Continue with Google** instead.

## What password rules apply?

Email-account passwords must contain at least eight characters, one letter, and one number. The same rules apply when changing your password.

## Is Handy Pet free?

Handy Pet includes a free plan. When Pro enforcement is enabled, the first pet, vaccination tracking, and weight tracking are available on the free plan. Pro features are controlled by the app's purchase configuration and entitlement status.

## What does Handy Pet Pro unlock?

When Pro access is active, you can:

- Add additional pets.
- Create and edit vet visits, medications, medical records, reminders, and documents.
- Upload or replace document files in cloud storage.
- Export selected health records as a PDF.

PDF exports let you choose which record sections to include. Documents are kept in the app but are not included as an export section. Vet-visit costs are excluded unless you explicitly select **Include cost**.

## How many pets can I add?

The free plan supports one pet. Adding a second or later pet requires Pro when entitlement enforcement is enabled. Basic editing of an existing pet profile remains available. In the current production configuration, Pro enforcement is disabled until the live purchase provider is connected.

## Can I add historical or future information?

Yes. Vaccinations and weight entries can be historical. Pro users can also add supported historical records such as vet visits, medications, and medical records, as well as future vet visits and reminders. Reminder dates cannot be saved in the past.

## What happens to my data if Pro access ends?

Your existing Pro-only records remain available to view. You can still delete records, download existing document files, and complete one-way actions such as completing a visit, ending a medication, or disabling a reminder. Creating, duplicating, editing, replacing document files, and exporting require Pro. Reopening or reactivating those completed or disabled items requires Pro.

## Are notifications required?

No. Saving a record remains possible when notifications are disabled or permission is denied. If enabled, Handy Pet can notify you about upcoming vaccinations, vet visits, medications, and reminders. Related alerts may be combined into a digest notification; tapping it opens Home with Today selected.

You can enable notifications in Settings. If the operating system has denied permission, Handy Pet provides a link to the device settings.

## How do reminders work?

Reminders require a date and time. A newly created or edited reminder uses its saved local time. Older reminders may use the configured default reminder time until they are edited. Reminder notifications can be scheduled for the selected time or according to the configured reminder offset.

## Can I manage my subscription?

The Account section provides the Pro status, available plans, purchase, restore-purchase, and subscription-management actions when the purchase backend is enabled. The current production configuration does not yet connect a live purchase provider; release builds therefore do not offer live Pro purchases. Debug builds use a test purchase service.

## How do I cancel my subscription?

Open **Manage subscription** from the Pro status or purchase screen in the Account section. Handy Pet opens the subscription settings for the store where you subscribed. Follow the store's instructions to cancel before your next renewal date. Uninstalling Handy Pet does not cancel a subscription. After cancellation, Pro access normally remains available until the end of the current billing period.

## Can I restore a previous Pro purchase?

Yes, when a purchase backend is configured. Use **Restore purchases** in the Pro status or purchase screen. A successful restore reactivates the entitlement associated with the account or store purchase.

## Can I delete my account?

Yes. Account deletion is available in Settings. It permanently removes the account, local data, synced cloud data, pet records, and associated documents. The action cannot be undone and may require password reauthentication.

## Is Handy Pet a replacement for a veterinarian?

No. Handy Pet only helps you organize and manage information. It does not provide veterinary diagnosis or treatment and is not a substitute for professional veterinary advice.
