/**
 * Canonical message builders — single source of truth for all share/letter messages.
 * All components MUST import from here. No local message functions allowed.
 */

const BASE_URL = "https://boom-perk-flow.base44.app";
const TARGET_1 = 10;
const TARGET_2 = 20;

export function buildOrgLink(orgKey, refId) {
  const base = `${BASE_URL}/join/${encodeURIComponent(orgKey)}`;
  return refId ? `${base}?ref=${encodeURIComponent(refId)}` : base;
}

/**
 * Build structured insights from GroupRequest data for use in letters.
 */
export function buildSurveyInsights(groupData) {
  if (!groupData) return {};
  return {
    painPoint: groupData.painPoint || groupData.activities?.[0] || null,
    currentClub: groupData.currentClub || groupData.activities?.[1] || null,
    welfareBudget: groupData.welfareBudget || groupData.activities?.[2] || null,
    holidayBudget: groupData.holidayBudget || null,
    count: groupData.currentCount || 1,
  };
}

/**
 * Employee WhatsApp share message — single link only to org page.
 */
export function buildWaMessage(orgName, orgKey, count, refId) {
  const link = buildOrgLink(orgKey, refId);

  if (count >= TARGET_2) {
    return `היי 👋

כבר ${count} עובדים מ${orgName} הצטרפו לבקשה.

בום ביי נותנת גישה לחשמל ואלקטרוניקה במחירי יבואן, 8% הנחה קבועה בסופר, וחופשות בארץ ובחו"ל במחירי סיטונאי.

כל הצטרפות נוספת מחזקת את הפנייה לרווחה.

מצטרפים כאן:
${link}`;
  }

  if (count >= TARGET_1) {
    const remaining = TARGET_2 - count;
    return `היי 👋

כבר ${count} עובדים מ${orgName} הצטרפו לבקשה.

בום ביי נותנת גישה לחשמל ואלקטרוניקה במחירי יבואן, 8% הנחה קבועה בסופר, וחופשות בארץ ובחו"ל במחירי סיטונאי.

חסרים עוד ${remaining} להגיע ל-20. מצטרפים כאן:
${link}`;
  }

  return `היי 👋

גם אני הצטרפתי לבקשה להכניס את בום ביי לארגון שלנו.

בום ביי נותנת גישה לחשמל ואלקטרוניקה במחירי יבואן, 8% הנחה קבועה בסופר, וחופשות בארץ ובחו"ל במחירי סיטונאי. בלי שהארגון משלם שקל נוסף.

ככל שיצטרפו יותר עובדים, כך גדל הסיכוי שזה יקרה. לוקח 10 שניות:
${link}`;
}

/**
 * Management / HR / union letter — formal, professional, non-accusatory.
 */
export function buildLetterMessage(orgName, orgKey, count, insights = {}) {
  const link = buildOrgLink(orgKey);
  const { painPoint } = insights;

  return `שלום,

אנחנו קבוצה של עובדים מ${orgName} שמעוניינת להכניס את בום ביי לארגון שלנו.

בום ביי מאפשרת לעובדים גישה לחשמל ואלקטרוניקה במחירי יבואן (Apple, Samsung ועוד), 8% הנחה קבועה ברשתות הסופר המוזלות, וחופשות והופעות בארץ ובחו"ל במחירי סיטונאי. לאורך כל השנה, לא רק בחג.${painPoint ? `\n\nמהסקר שמילאו העובדים: הכאב המרכזי הוא ${painPoint}.` : ""}

כבר ${count} עובדים מ${orgName} הצטרפו לבקשה זו.

המודל לא מצריך תוספת תקציב מהארגון.

לפרטים נוספים על בום ביי:
www.boombuyonepage.com

עמוד הבקשה של הארגון שלכם:
${link}

ליצירת קשר:
https://wa.me/972542552222`;
}