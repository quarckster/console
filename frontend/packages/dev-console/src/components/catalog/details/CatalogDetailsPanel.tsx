import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { CatalogItem } from '@console/plugin-sdk';
import { PropertiesSidePanel, PropertyItem } from '@patternfly/react-catalog-view-extension';
import { ExternalLink, SectionHeading, Timestamp } from '@console/internal/components/utils';

type CatalogDetailsPanelProps = {
  item: CatalogItem;
};

const CatalogDetailsPanel: React.FC<CatalogDetailsPanelProps> = ({ item }) => {
  const { t } = useTranslation();
  const { description, provider, creationTimestamp, supportUrl, documentationUrl, details } = item;
  return (
    <div className="modal-body modal-body-border">
      <div className="modal-body-content">
        <div className="modal-body-inner-shadow-covers">
          <div className="co-catalog-page__overlay-body">
            <PropertiesSidePanel>
              {details?.properties?.map((property) => (
                <PropertyItem key={property.label} label={property.label} value={property.value} />
              ))}
              {provider && <PropertyItem label={t('devconsole~Provider')} value={provider} />}
              {supportUrl && (
                <PropertyItem
                  label={t('devconsole~Support')}
                  value={<ExternalLink href={supportUrl} text={t('devconsole~Get support')} />}
                />
              )}
              {documentationUrl && (
                <PropertyItem
                  label={t('devconsole~Documentation')}
                  value={
                    <ExternalLink
                      href={documentationUrl}
                      text={t('devconsole~Refer documentation')}
                    />
                  }
                />
              )}
              {creationTimestamp && (
                <PropertyItem
                  label={t('devconsole~Created At')}
                  value={<Timestamp timestamp={creationTimestamp} />}
                />
              )}
            </PropertiesSidePanel>
            <div className="co-catalog-page__overlay-description">
              <SectionHeading text={t('devconsole~Description')} />
              {description && <p>{description}</p>}
              {details?.descriptions?.map((desc, index) => (
                <React.Fragment key={index}>
                  {desc.label && <SectionHeading text={desc.label} />}
                  {desc.value}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogDetailsPanel;
