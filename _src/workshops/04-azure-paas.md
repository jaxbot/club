---
title: Azure Platform-as-a-Service Cloud Workshop
slug: workshops/azure
date: 9/25/2015
template: workshop
---

Table of Contents
=================
1. Register for Azure (aka how to dreamspark)
2. Register for Github (if you haven't already)
3. Create new repo for Azure web app
4. Clone Repo
5. Navigate to web app in browser
6. Manage relevant web app settings

Note: The following instructions will require some form of identity verification and will ask for a confirmation code from a valid cell phone number.

If you use Dreamspark, you will need a valid .edu email address (Knights Mail). This is the better option but you may run into issues in verification. This is not limited to CECS students and is not the same as OnTheHub.

If you do not use Dreamspark, you are going for a trial and will get a $200 credit with a 30 day expiration date. You will need to also enter valid Credit/Debit Card info for identity verification. You will not be charged without opting in to additional charges in your Azure account. The credit/debit card is not needed when using Dreamspark.

Slide Link:
https://docs.google.com/presentation/d/1zY6GDns2JcvdxfLww_lNsjcnH8UTOuphLJ0UAYcoQaU/edit#slide=id.gc9bbef7e6_1_5

Register for Azure
==================

Navigate to dreamspark.com.

![Dreamspark Main Page](/pics/workshops/azure/dreamsparkMain.png)

Click the “Get Azure Now” link.

![Azure Dreamspark Page](/pics/workshops/azure/azureDreamsparkPage.png)

Click “Sign In or Create your Dreamspark Account”.
If you need to create an account you will go to this page.

![Sign Up For Dreamspark](/pics/workshops/azure/dreamsparkSignUp.png)

You will need to create an account and register with your .edu email address.

Then check your email and click the verification link inside.

If this does not work then you will not be able to use Azure for Dreamspark and must setup a dreamspark trial instead if you wish to follow along.

After you have completed dreamspark registration and have a verified account return to the dreamspark Azure page.

![What you will see after you have verified your account](/pics/workshops/azure/afterVerification.png)

The second link should now be “Register now” if your account is verified.

You will now be directed to Azure’s signup page.

![Azure Registration Screen](/pics/workshops/azure/azureSignup.png)

Fill out the form above and agree to the relevant agreements.

You will have to verify the phone number you submit via text message.

If the transfer from dreamspark or is unsuccessful you can sign up for a trial from azure.microsoft.com

The signup form will be similar except you will need a valid Microsoft account and credit card. (It won’t be charged unless you choose to give explicit authorization later.)

![Setting up Azure](/pics/workshops/azure/azureAfterDreamsparkRegistration.png)

You should get the above page. After the setup is complete you will get the following:

![Wecome to Azure](/pics/workshops/azure/startManagingService.png)

Click “Start managing my service”

You may be dropped into the old management portal.

![Old Azure Portal](/pics/workshops/azure/azureOldPortal.png)

If you get dropped into the beta portal, click the “Azure portal” link.

![Azure Preview Portal Link](/pics/workshops/azure/azurePreviewPortalLink.png)

If you’d like to go back click on your user account and then click the “Switch to Azure Preview Portal” link.

Setting Up Your GitHub Repo
===========================

Navigate to http://github.com and login to your github account

Create a New Repository that will contain the deployable files for your new web app
Clone that repository locally.

Make changes to your app, sample page here:

```
<!doctype html>
<html>
<body>
<h2>My First Azure App!</h2>
</body>
</html>
```

Commit, pull, and push changes

Setting up your web app
-----------------------

![Azure Add Web Application](/pics/workshops/azure/azureNewAppBetaPortal.png)

* Click on “New” in the top left corner of the page.
* Click Web + Mobile
* Click Web App.
* You will get an additional pane asking you for information for your new app.
* You now need to enter some information into your web app.
* The first thing is you need to specify is your URL on the hosting platform. For Microsoft Azure the hosted URL will be *.azurewebsites.net.

* The URL must be unique to your application, and must be within the constraints displayed in the window.
* Select the ServicePlan, the default will be fine.  This option allows you to change the data center your app is hosted in. Service prices and response times may differ between datacenters.
* Click “Create”.

![Deploying Your New Web App](/pics/workshops/azure/azureAppDeploying.png)

* The system will now deploy your new application and pin it to the dashboard if you have ticked the option on the previous pane.
* Azure will take a few moments to provision the servers necessary to create your new environment.
* Now that we have our new environment we need to setup pulling from version control.
* To do this we need to access the settings of our web app which we can do by accessing the pinned dashboard app. If the app is not pinned you can use the all resources listing on the side to find it.

![New Portal Settings](/pics/workshops/azure/azureNewPortalSettings.png)

In the settings panel we can change many different things about our app. What we need to change to setup version control is the settings labeled “Continuous Deployment”

After you click it you will be presented with the following sources.

![Source of Repo](/pics/workshops/azure/newPortalContinousDeploymentSources.png)

This will ask where we will  pull our code from. Select GitHub.

After you make this selection you will be asked to sign in to your github account.

![Authorize and Login to Your Github Account](/pics/workshops/azure/azureGitHubAuthorize.png)

* Login and select the repository you just created.
* After successfully logging in you will be presented with the following message.

![Authorization Successful](/pics/workshops/azure/azureNewAuthorizationComplete.png)

* Click ok.

![Which Repo Would you like to choose?](/pics/workshops/azure/azureWhichRepoNew.png)

You will now be asked which Repository on Github you’d like to deploy and which branch you’d like to deploy it on. For demo purposes we will use master but you could make a production branch if you desire.

Click ok.

![Azure New Deploymnets](/pics/workshops/azure/azureNewDeployments.png)

You just deployed your first cloud app on Azure!

Azure will pull periodically from your github repo. You can force it to update by clicking the sync button or disconnect the repo to pull a different repository if needed in the future.

You can click your URL to visit your application. This will be a few panes over in the app information.

You can click the Stop or Restart buttons after selecting your web app to do the desired management action. You can also delete your web app if you’d like.

Elsewhere in the dashboard we can view some basic resource usage information about our app and see some of the settings we have available.

Monitor gives us an enhanced version of the resource usage utilization graph of the dashboard.

Web Tasks allows us to upload scripts to run on a certain period of time similar to a cronjob in linux or a Windows Scheduler Task in Windows.

If we click configure we get the following options that can be used to determine which version of our packages we should be running.

Scale allows us to manage our auto scalability so our site won’t go down if we get a ton of traffic. For most websites you probably don’t need this but you can always set this up if you wish. Be careful though, on a real azure account that you have accepted payment liability on you are responsible for covering the cost of all resources used.

On the free tier we are limited to only one instance for our application.

Linked Resources allows us to manage other azure services that we may be using have in combination with this app such as a Content Delivery Network, Analytics, Storage, Azure Drives, or other resources.

Backups allows you to manage automated backups for your web app.

You can schedule backups on the frequency you wish but you can’t do this in the free pricing tier.

Congratulations, these are the basics of Azure. Hope you enjoyed the workshop!
