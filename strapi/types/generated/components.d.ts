import type { Schema, Struct } from '@strapi/strapi';

export interface MyAboutUsCard extends Struct.ComponentSchema {
  collectionName: 'components_my_about_us_cards';
  info: {
    displayName: 'AboutUsCard';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    iconName: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MyDigitComponent extends Struct.ComponentSchema {
  collectionName: 'components_my_digit_components';
  info: {
    displayName: 'digitComponent';
  };
  attributes: {
    addText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    digit: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface MyOutstaffCard extends Struct.ComponentSchema {
  collectionName: 'components_my_outstaff_cards';
  info: {
    displayName: 'outstaffCard';
    icon: 'alien';
  };
  attributes: {
    calculation: Schema.Attribute.JSON;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    techCards: Schema.Attribute.Component<'my.tech-card', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MyProblemCard extends Struct.ComponentSchema {
  collectionName: 'components_my_problem_cards';
  info: {
    displayName: 'problemCard';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    iconName: Schema.Attribute.String;
    solution: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MyServiceCard extends Struct.ComponentSchema {
  collectionName: 'components_my_service_cards';
  info: {
    displayName: 'serviceCard';
    icon: 'briefcase';
  };
  attributes: {
    artifacts: Schema.Attribute.JSON;
    duration: Schema.Attribute.String;
    extras: Schema.Attribute.JSON;
    features: Schema.Attribute.JSON;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    price: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MyTechCard extends Struct.ComponentSchema {
  collectionName: 'components_my_tech_cards';
  info: {
    displayName: 'techCard';
    icon: 'connector';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'my.about-us-card': MyAboutUsCard;
      'my.digit-component': MyDigitComponent;
      'my.outstaff-card': MyOutstaffCard;
      'my.problem-card': MyProblemCard;
      'my.service-card': MyServiceCard;
      'my.tech-card': MyTechCard;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
