import useTranslations from '@/hooks/useTranslations';

function useServices() {
  const { t } = useTranslations();

  const services: string[] = [
    t('services.list.brand_strategy'),
    t('services.list.research_analysis'),
    t('services.list.brand_positioning'),
    t('services.list.brand_narrative'),
    t('services.list.communication'),
    t('services.list.content_strategy'),
    t('services.list.design_strategy'),
    t('services.list.digital_strategy'),
    t('services.list.social_media_strategy'),
    t('services.list.naming'),
    t('services.list.brand_design'),
    t('services.list.visual_identity'),
    t('services.list.verbal_identity'),
    t('services.list.motion_design'),
    t('services.list.packaging_label'),
    t('services.list.publications'),
    t('services.list.typography'),
    t('services.list.illustration'),
    t('services.list.brand_guidelines'),
    t('services.list.art_illustration'),
    t('services.list.digital_design'),
    t('services.list.ux_ui_design'),
    t('services.list.interaction_design'),
    t('services.list.digital_design_systems'),
    t('services.list.digital_prototyping'),
    t('services.list.website_design'),
    t('services.list.marketing_materials'),
    t('services.list.ad_creative'),
    t('services.list.app_design'),
    t('services.list.social_media_creative'),
    t('services.list.presentation_design'),
    t('services.list.brand_communication'),
    t('services.list.brand_story'),
    t('services.list.advertising'),
    t('services.list.merchandise'),
    t('services.list.editorial_design'),
    t('services.list.social_media'),
    t('services.list.signage'),
  ];

  return { services };
}

export default useServices;
