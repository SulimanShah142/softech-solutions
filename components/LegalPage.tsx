
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteNavbar from "@/components/site-navbar";
import {
  SITE_LANGUAGE_CHANGE_EVENT,
  SITE_LANGUAGE_STORAGE_KEY,
  isSiteLanguage,
  type SiteLanguage,
} from "@/lib/site-language";

type LegalDocument = "privacy" | "terms";

type LegalSection = {
  title: string;
  body: string;
};

type LegalContent = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

const legalCopy: Record<
  SiteLanguage,
  {
    privacy: LegalContent;
    terms: LegalContent;
    review: string;
    footer: string;
    home: string;
    privacyLabel: string;
    termsLabel: string;
  }
> = {
  en: {
    privacy: {
      title: "Privacy Policy",
      intro:
        "This Privacy Policy explains how SofTech Solutions handles information submitted through this website. It covers website inquiries and does not replace any separate agreement or privacy notice that applies to a specific software product or client project.",
      sections: [
        {
          title: "1. Information You Provide",
          body:
            "When you contact us through the website, you may provide your name, email address, project type, project requirements, and any other information you choose to include in your message. Please avoid sending passwords, payment card details, identity documents, confidential credentials, or other sensitive information through a general inquiry form.",
        },
        {
          title: "2. How We Use Your Information",
          body:
            "We use inquiry information to understand your requirements, respond to questions, communicate with you about potential or ongoing projects, prepare relevant proposals, and manage business communications. We may also use the information when necessary to protect the website, address misuse, or meet applicable legal obligations.",
        },
        {
          title: "3. How Information Is Transmitted",
          body:
            "Website inquiries are submitted through the contact form's configured submission and email-delivery process. Your information may therefore be processed by the technical providers involved in operating the website, handling form submissions, hosting the website, or delivering messages. Their processing is subject to the services and configurations in use.",
        },
        {
          title: "4. Cookies and Local Storage",
          body:
            "This website may use browser storage to remember your language preference and may use essential technical mechanisms required for its operation. Your browser may also process technical information when loading the website. The technologies in use can change as the website develops. This policy does not claim that analytics, advertising cookies, or other tracking technologies are used unless they are actually implemented.",
        },
        {
          title: "5. Sharing and Third-Party Services",
          body:
            "Information may be accessible to service providers involved in operating the website and handling your inquiry, or may be disclosed when reasonably necessary to comply with law, protect rights, or address security and misuse concerns. We do not authorize service providers to use inquiry information for purposes unrelated to the services they provide, subject to the applicable arrangements and law. The actual providers depend on the website's current configuration.",
        },
        {
          title: "6. Retention and Security",
          body:
            "We retain inquiry information for as long as reasonably necessary for communication, business records, follow-up, dispute resolution, and applicable legal requirements. The exact retention period may vary according to the nature of the inquiry and the systems involved. We use reasonable measures intended to protect information, but no website, transmission method, or storage system can be guaranteed to be completely secure.",
        },
        {
          title: "7. Your Choices and Privacy Requests",
          body:
            "You may choose not to submit information through the website. You may also contact us to request access to, correction of, or deletion of information associated with your inquiry. We may need to verify your identity before responding, and some information may need to be retained where required or permitted by law. We will handle requests in accordance with applicable requirements.",
        },
        {
          title: "8. Client Projects and Software Products",
          body:
            "When SofTech develops, hosts, integrates, or maintains software for a client, the collection and use of data within that product may be governed by the client's privacy notice, the project's technical configuration, and the relevant written agreement. The parties' responsibilities depend on the services provided and applicable law. This website policy alone does not describe every data practice of software products developed for clients.",
        },
        {
          title: "9. Children and Young Users",
          body:
            "This website is intended for people seeking information about professional software and digital services, not for the collection of children's personal information. If you believe a child has submitted personal information unnecessarily, contact us so we can review the situation and take appropriate action where required.",
        },
        {
          title: "10. Changes to This Policy",
          body:
            "We may update this Privacy Policy when our website, services, or data practices change. The revised version will be published on this page. Please review it periodically to understand the practices described in the current version.",
        },
        {
          title: "11. Contact Us",
          body:
            "For questions about this Privacy Policy or requests relating to information submitted through this website, contact SofTech Solutions using the email address below.",
        },
      ],
    },
    terms: {
      title: "Terms",
      intro:
        "This page is a basic terms draft for review, not legal advice.",
      sections: [
        {
          title: "Website information",
          body:
            "This website provides general information about SofTech's services and approach. It is not a project proposal, quote, or commitment to deliver a particular result.",
        },
        {
          title: "Project agreements",
          body:
            "Any project work, scope, fees, schedule, deliverables, and other terms should be agreed separately in writing before work begins.",
        },
        {
          title: "Questions",
          body:
            "For questions about these draft terms, contact:",
        },
      ],
    },
    review: "SOFTECH SOLUTIONS / LEGAL",
    footer: "SofTech Solutions",
    home: "Home",
    privacyLabel: "Privacy",
    termsLabel: "Terms",
  },

  "fa-AF": {
    privacy: {
      title: "پالیسی حریم خصوصی",
      intro:
        "این پالیسی توضیح می‌دهد که سافت‌تیک سولوشنز چگونه با اطلاعاتی که از طریق این وب‌سایت فرستاده می‌شود، برخورد می‌کند. این پالیسی درخواست‌های مربوط به وب‌سایت را پوشش می‌دهد و جایگزین توافق‌نامه یا پالیسی جداگانهٔ مربوط به یک محصول نرم‌افزاری یا پروژهٔ مشتری نیست.",
      sections: [
        {
          title: "۱. اطلاعاتی که شما ارائه می‌کنید",
          body:
            "هنگام تماس از طریق وب‌سایت، ممکن است نام، نشانی ایمیل، نوع پروژه، نیازمندی‌های پروژه و سایر اطلاعاتی را که در پیام خود درج می‌کنید، ارائه نمایید. لطفاً رمزهای عبور، معلومات کارت بانکی، اسناد هویتی، اطلاعات محرمانهٔ دسترسی یا سایر معلومات حساس را از طریق فرم عمومی تماس ارسال نکنید.",
        },
        {
          title: "۲. چگونگی استفاده از اطلاعات",
          body:
            "از اطلاعات درخواست شما برای درک نیازمندی‌ها، پاسخ‌گویی به پرسش‌ها، ارتباط دربارهٔ پروژه‌های احتمالی یا جاری، آماده‌سازی پیشنهادهای مرتبط و مدیریت مکاتبات تجارتی استفاده می‌کنیم. در صورت ضرورت، ممکن است این اطلاعات برای حفاظت از وب‌سایت، رسیدگی به سوءاستفاده یا رعایت مکلفیت‌های قانونی نیز استفاده شود.",
        },
        {
          title: "۳. انتقال اطلاعات",
          body:
            "درخواست‌های وب‌سایت از طریق سیستم تنظیم‌شدهٔ ارسال فرم و تحویل ایمیل فرستاده می‌شوند. بنابراین، اطلاعات شما ممکن است توسط ارائه‌دهندگان تخنیکی دخیل در فعالیت وب‌سایت، پردازش فرم‌ها، میزبانی وب‌سایت یا ارسال پیام‌ها پردازش شود. شیوهٔ پردازش آنان به خدمات و تنظیمات مورد استفاده بستگی دارد.",
        },
        {
          title: "۴. کوکی‌ها و ذخیره‌سازی محلی",
          body:
            "این وب‌سایت ممکن است برای به‌خاطر سپردن زبان انتخاب‌شده از ذخیره‌سازی مرورگر استفاده کند و برای فعالیت خود به سازوکارهای تخنیکی ضروری نیاز داشته باشد. مرورگر شما هنگام بازکردن وب‌سایت ممکن است اطلاعات تخنیکی را نیز پردازش کند. این پالیسی استفاده از ابزارهای تحلیل، کوکی‌های تبلیغاتی یا سایر فناوری‌های ردیابی را ادعا نمی‌کند، مگر این‌که واقعاً در وب‌سایت فعال شده باشند.",
        },
        {
          title: "۵. شریک‌سازی اطلاعات و خدمات اشخاص ثالث",
          body:
            "اطلاعات ممکن است در اختیار ارائه‌دهندگان خدماتی قرار گیرد که در فعالیت وب‌سایت و رسیدگی به درخواست شما نقش دارند. همچنان، در صورت ضرورت معقول برای رعایت قانون، حفاظت از حقوق یا رسیدگی به مسائل امنیتی و سوءاستفاده، ممکن است اطلاعات افشا شود. استفاده از اطلاعات توسط ارائه‌دهندگان خدمات تابع ترتیبات مربوط و قوانین قابل اجرا است. ارائه‌دهندگان واقعی به تنظیمات فعلی وب‌سایت بستگی دارند.",
        },
        {
          title: "۶. نگهداری و امنیت اطلاعات",
          body:
            "اطلاعات درخواست‌ها را تا زمانی نگهداری می‌کنیم که برای مکاتبات، سوابق تجارتی، پیگیری، حل اختلافات و رعایت الزامات قانونی به‌گونهٔ معقول ضروری باشد. مدت دقیق نگهداری ممکن است بر اساس نوع درخواست و سیستم‌های مورد استفاده فرق کند. برای حفاظت از اطلاعات تدابیر معقول اتخاذ می‌شود؛ با این حال، امنیت کامل هیچ وب‌سایت، روش انتقال یا سیستم ذخیره‌سازی قابل تضمین نیست.",
        },
        {
          title: "۷. انتخاب‌ها و درخواست‌های حریم خصوصی شما",
          body:
            "شما می‌توانید از ارسال اطلاعات از طریق وب‌سایت خودداری کنید. همچنان می‌توانید برای درخواست دسترسی، اصلاح یا حذف اطلاعات مربوط به درخواست خود با ما تماس بگیرید. ممکن است پیش از پاسخ‌گویی نیاز به تأیید هویت شما باشد و در مواردی که قانون اجازه یا الزام می‌دهد، نگهداری برخی اطلاعات ضروری باشد. درخواست‌ها مطابق الزامات قابل اجرا بررسی می‌شوند.",
        },
        {
          title: "۸. پروژه‌های مشتریان و محصولات نرم‌افزاری",
          body:
            "هنگامی که سافت‌تیک برای یک مشتری نرم‌افزار توسعه می‌دهد، میزبانی می‌کند، با سیستم دیگری یکپارچه می‌سازد یا نگهداری می‌کند، جمع‌آوری و استفاده از اطلاعات در آن محصول ممکن است تابع پالیسی حریم خصوصی مشتری، تنظیمات تخنیکی پروژه و توافق‌نامهٔ کتبی مربوط باشد. مسئولیت طرف‌ها به خدمات ارائه‌شده و قوانین قابل اجرا بستگی دارد. این پالیسی به‌تنهایی تمام شیوه‌های پردازش اطلاعات در محصولات ساخته‌شده برای مشتریان را توضیح نمی‌دهد.",
        },
        {
          title: "۹. کودکان و کاربران کم‌سن",
          body:
            "این وب‌سایت برای افرادی در نظر گرفته شده است که دربارهٔ خدمات حرفه‌ای نرم‌افزاری و دیجیتال معلومات می‌خواهند، نه برای جمع‌آوری اطلاعات شخصی کودکان. اگر فکر می‌کنید کودکی بدون ضرورت اطلاعات شخصی خود را ارسال کرده است، با ما تماس بگیرید تا موضوع بررسی و در صورت لزوم اقدام مناسب انجام شود.",
        },
        {
          title: "۱۰. تغییرات این پالیسی",
          body:
            "ممکن است با تغییر وب‌سایت، خدمات یا شیوه‌های پردازش اطلاعات، این پالیسی را به‌روز کنیم. نسخهٔ اصلاح‌شده در همین صفحه نشر خواهد شد. لطفاً برای آگاهی از شیوه‌های فعلی، این صفحه را گاه‌گاهی بررسی کنید.",
        },
        {
          title: "۱۱. تماس با ما",
          body:
            "برای پرسش دربارهٔ این پالیسی یا درخواست‌های مربوط به اطلاعاتی که از طریق وب‌سایت فرستاده‌اید، از طریق نشانی ایمیل زیر با سافت‌تیک سولوشنز تماس بگیرید.",
        },
      ],
    },
    terms: {
      title: "شرایط",
      intro:
        "این صفحه پیش‌نویس سادهٔ شرایط برای بررسی است و مشورهٔ حقوقی نیست.",
      sections: [
        {
          title: "اطلاعات وب‌سایت",
          body:
            "این وب‌سایت اطلاعات عمومی دربارهٔ خدمات و رویکرد SofTech ارائه می‌کند. این محتوا پیشنهاد پروژه، نرخ‌نامه یا تعهد به نتیجهٔ مشخص نیست.",
        },
        {
          title: "توافق پروژه",
          body:
            "کار پروژه، محدوده، هزینه، زمان‌بندی، موارد تحویلی و شرایط دیگر باید پیش از آغاز کار جداگانه و به‌صورت کتبی توافق شوند.",
        },
        {
          title: "پرسش‌ها",
          body:
            "برای پرسش دربارهٔ این شرایط پیش‌نویس، تماس بگیرید:",
        },
      ],
    },
    review: "سافت‌تیک سولوشنز / معلومات حقوقی",
    footer: "SofTech Solutions",
    home: "خانه",
    privacyLabel: "حریم خصوصی",
    termsLabel: "شرایط",
  },

  ps: {
    privacy: {
      title: "د محرمیت تګلاره",
      intro:
        "دا تګلاره تشریح کوي چې سافټ‌ټېک سولوشنز د دې وېب‌پاڼې له لارې د لېږل شویو معلوماتو سره څنګه چلند کوي. دا تګلاره د وېب‌پاڼې غوښتنې رانغاړي او د ځانګړي سافټویر محصول یا د مراجع د پروژې د جلا تړون یا محرمیت تګلارې ځای نه نیسي.",
      sections: [
        {
          title: "۱. هغه معلومات چې تاسو یې وړاندې کوئ",
          body:
            "کله چې تاسو د وېب‌پاڼې له لارې اړیکه نیسئ، کېدای شي خپل نوم، برېښنالیک، د پروژې ډول، اړتیاوې او نور هغه معلومات وړاندې کړئ چې په پیغام کې یې لیکئ. مهرباني وکړئ د اړیکې په عمومي فورمه کې پاسورډونه، د بانکي کارت معلومات، د پېژندنې اسناد، محرمانه د لاسرسي معلومات یا نور حساس معلومات مه لېږئ.",
        },
        {
          title: "۲. ستاسو د معلوماتو کارول",
          body:
            "موږ د غوښتنې معلومات د اړتیاوو د درک، پوښتنو ته د ځواب، د احتمالي یا روانو پروژو په اړه د اړیکو، د اړوندو وړاندیزونو د چمتو کولو او د سوداګریزو اړیکو د مدیریت لپاره کاروو. د اړتیا پر مهال دا معلومات د وېب‌پاڼې د ساتنې، د ناوړه استفادې د څېړلو یا د قانوني مکلفیتونو د پوره کولو لپاره هم کارېدلی شي.",
        },
        {
          title: "۳. د معلوماتو لېږد",
          body:
            "د وېب‌پاڼې غوښتنې د فورمې د سپارلو او برېښنالیک د لېږلو له تنظیم شوې پروسې څخه تېرېږي. له همدې امله، ستاسو معلومات د هغو تخنیکي خدمتونو د برابرونکو له خوا پروسس کېدای شي چې د وېب‌پاڼې په چلولو، د فورمو په اداره کولو، کوربه‌توب یا د پیغامونو په لېږلو کې برخه لري. د هغوی د معلوماتو پروسس د کارېدونکو خدمتونو او تنظیماتو پورې تړاو لري.",
        },
        {
          title: "۴. کوکیز او سیمه‌ییز زېرمتون",
          body:
            "دا وېب‌پاڼه ښايي د ژبې د انتخاب د یاد ساتلو لپاره د براوزر زېرمتون وکاروي او د فعالیت لپاره اړینو تخنیکي میکانیزمونو ته اړتیا ولري. ستاسو براوزر د وېب‌پاڼې د پرانیستلو پر مهال تخنیکي معلومات هم پروسس کولای شي. دا تګلاره د تحلیلي وسایلو، تبلیغاتي کوکیز یا نورو تعقیبي ټکنالوژیو د کارولو ادعا نه کوي، مګر دا چې په رښتیا فعالې شوې وي.",
        },
        {
          title: "۵. د معلوماتو شریکول او د درېیمو خواوو خدمتونه",
          body:
            "معلومات له هغو خدمت‌برابروونکو سره شریکېدای شي چې د وېب‌پاڼې په چلولو او ستاسو د غوښتنې په اداره کولو کې برخه لري. معلومات هغه مهال هم افشا کېدای شي چې د قانون مراعت، د حقونو ساتنې، امنیتي ستونزو یا ناوړه استفادې د څېړلو لپاره په معقول ډول اړین وي. د خدمت‌برابروونکو له خوا د معلوماتو کارول د اړوندو ترتیباتو او نافذو قوانینو تابع دي. د خدمت‌برابروونکو نومونه د وېب‌پاڼې له اوسنیو تنظیماتو سره تړاو لري.",
        },
        {
          title: "۶. د معلوماتو ساتنه او امنیت",
          body:
            "موږ د غوښتنو معلومات تر هغه وخته ساتو چې د اړیکو، سوداګریزو اسنادو، تعقیب، شخړو د حل او قانوني مکلفیتونو لپاره په معقول ډول اړین وي. د ساتنې دقیقه موده د غوښتنې او کارېدونکو سیستمونو له مخې توپیر کولای شي. د معلوماتو د ساتنې لپاره معقول تدابیر کاروو، خو د هېڅ وېب‌پاڼې، د لېږد طریقې یا زېرمه‌کولو سیستم بشپړ امنیت تضمین کېدای نه شي.",
        },
        {
          title: "۷. ستاسو انتخابونه او د محرمیت غوښتنې",
          body:
            "تاسو کولای شئ د وېب‌پاڼې له لارې د معلوماتو له لېږلو ډډه وکړئ. همدارنګه، د خپلو غوښتنو اړوند معلوماتو ته د لاسرسي، سمون یا حذف غوښتنه کولای شئ. ښايي له ځواب وړاندې ستاسو د هویت تایید ته اړتیا وي، او د قانون له مخې ځینې معلومات ساتل اړین یا مجاز کېدای شي. غوښتنې به د نافدو قانوني اړتیاوو سره سم وڅېړل شي.",
        },
        {
          title: "۸. د مراجعینو پروژې او سافټویري محصولات",
          body:
            "کله چې سافټ‌ټېک د مراجع لپاره سافټویر جوړوي، کوربه‌توب یې کوي، له نورو سیستمونو سره یې نښلوي یا یې ساتنه کوي، په هغه محصول کې د معلوماتو راټولول او کارول د مراجع د محرمیت تګلارې، د پروژې تخنیکي تنظیماتو او اړوند لیکلي تړون تابع کېدای شي. د خواوو مسؤلیتونه د وړاندې شویو خدمتونو او نافدو قوانینو له مخې ټاکل کېږي. دا تګلاره په یوازې ځان د مراجعینو لپاره د جوړو شویو ټولو محصولاتو د معلوماتو د پروسس طریقې نه تشریح کوي.",
        },
        {
          title: "۹. ماشومان او کم‌عمره کاروونکي",
          body:
            "دا وېب‌پاڼه د هغو کسانو لپاره ده چې د مسلکي سافټویر او ډیجیټلي خدمتونو په اړه معلومات غواړي، نه د ماشومانو د شخصي معلوماتو د راټولولو لپاره. که فکر کوئ چې یوه ماشوم خپل شخصي معلومات بې‌اړتیا لېږلي دي، له موږ سره اړیکه ونیسئ څو موضوع وڅېړو او د اړتیا پر مهال مناسب اقدام وکړو.",
        },
        {
          title: "۱۰. په دې تګلاره کې بدلونونه",
          body:
            "کېدای شي د وېب‌پاڼې، خدمتونو یا د معلوماتو د پروسس د طریقو د بدلون له امله دا تګلاره تازه کړو. نوې نسخه به په همدې پاڼه کې خپره شي. د اوسنیو کړنلارو د پوهېدو لپاره وخت په وخت دا پاڼه وګورئ.",
        },
        {
          title: "۱۱. له موږ سره اړیکه",
          body:
            "د دې محرمیت تګلارې یا د وېب‌پاڼې له لارې د لېږل شویو معلوماتو په اړه د غوښتنو لپاره، د لاندې برېښنالیک له لارې له سافټ‌ټېک سولوشنز سره اړیکه ونیسئ.",
        },
      ],
    },
    terms: {
      title: "شرایط",
      intro:
        "دا پاڼه د بیاکتنې لپاره د شرایطو ساده مسوده ده، حقوقي مشوره نه ده.",
      sections: [
        {
          title: "د وېب‌پاڼې معلومات",
          body:
            "دا وېب‌پاڼه د SofTech د خدمتونو او تګلارې په اړه عمومي معلومات وړاندې کوي. دا د پروژې وړاندیز، نرخ‌پاڼه یا د یوې ځانګړې پایلې ژمنه نه ده.",
        },
        {
          title: "د پروژې تړونونه",
          body:
            "د پروژې کار، ساحه، لګښتونه، مهالوېش، سپارل کېدونکي توکي او نور شرایط باید د کار له پیل مخکې په جلا لیکلي تړون کې ومنل شي.",
        },
        {
          title: "پوښتنې",
          body:
            "د دې مسودې شرایطو په اړه د پوښتنو لپاره اړیکه ونیسئ:",
        },
      ],
    },
    review: "سافټ‌ټېک سولوشنز / حقوقي معلومات",
    footer: "SofTech Solutions",
    home: "کور",
    privacyLabel: "محرمیت",
    termsLabel: "شرایط",
  },
};

export default function LegalPage({
  document,
}: {
  document: LegalDocument;
}) {
  const [language, setLanguage] = useState<SiteLanguage>("en");

  const copy = legalCopy[language];
  const page = copy[document];
  const isRtl = language !== "en";

  useEffect(() => {
    const applyLanguage = (value: string | null) => {
      if (isSiteLanguage(value)) {
        setLanguage(value);
      }
    };

    const onLanguageChange = (event: Event) => {
      applyLanguage(
        (event as CustomEvent<SiteLanguage>).detail,
      );
    };

    try {
      applyLanguage(
        window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY),
      );
    } catch {
      // Keep English as the default if browser storage is unavailable.
    }

    window.addEventListener(
      SITE_LANGUAGE_CHANGE_EVENT,
      onLanguageChange,
    );

    return () => {
      window.removeEventListener(
        SITE_LANGUAGE_CHANGE_EVENT,
        onLanguageChange,
      );
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#03070f] text-[#EDF3FA]">
      <SiteNavbar />

      <main
        lang={language}
        dir={isRtl ? "rtl" : "ltr"}
        className="mx-auto min-h-[70vh] max-w-4xl px-5 py-16 sm:px-8 sm:py-24"
      >
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#28D9A0]">
          {copy.review}
        </p>

        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
          {page.title}
        </h1>

        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400">
          {page.intro}
        </p>

        <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {page.sections.map((section, index) => {
            const isContactSection =
              index === page.sections.length - 1;

            return (
              <section
                key={section.title}
                className="py-6 sm:py-7"
              >
                <h2 className="text-lg font-semibold text-white">
                  {section.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {section.body}
                </p>

                {isContactSection && (
                  <a
                    className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-[#80E4C4] underline decoration-[#28D9A0]/40 underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0]"
                    href="mailto:info@softechsoftwaresystems.com"
                  >
                    info@softechsoftwaresystems.com
                  </a>
                )}
              </section>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-white/[0.08] px-5 py-6 text-sm text-slate-500 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0]"
          >
            {copy.footer} · {copy.home}
          </Link>

          <nav
            aria-label={
              language === "en" ? "Legal" : copy.termsLabel
            }
            className="flex gap-5"
          >
            <Link
              href="/privacy"
              className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0]"
            >
              {copy.privacyLabel}
            </Link>

            <Link
              href="/terms"
              className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0]"
            >
              {copy.termsLabel}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
