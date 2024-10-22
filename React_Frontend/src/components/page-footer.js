import React from "react";
import { PageFooterHyperlink } from "./page-footer-hyperlink";

export const PageFooter = () => {
  const resourceList = [
    // {
    //   path: "https://auth0.com/why-auth0/",
    //   label: "Why Auth0",
    // },
  ];

  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div className="page-footer-grid__info">
          <div className="page-footer-info__message">
          </div>
          <div className="page-footer-info__button">
            {/* <a
                id="create-account-button"
                className="button button--secondary"
                href="http://localhost:4040/profile"
                target="_blank"
                rel="noreferrer noopener"
              >
                Create Free Account
              </a> */}
          </div>
          <div className="page-footer-info__resource-list">
            {resourceList.map((resource) => (
              <div
                key={resource.path}
                className="page-footer-info__resource-list-item"
              >
                <PageFooterHyperlink path={resource.path}>
                  {resource.label}
                </PageFooterHyperlink>
              </div>
            ))}
          </div>
        </div>
        <div className="page-footer-grid__brand">
          <div className="page-footer-brand">
            
            <img
                className="page-footer-brand__logo"
                src="https://img.icons8.com/?size=100&id=RHLuYrY4GjUv&format=png&color=000000"
                alt="Auth0"
                width="20"
                height="22.22"
              />
              <PageFooterHyperlink path="https://github.com/isumitjha/Calendar-App">
                Source Code at Github
              </PageFooterHyperlink>
          </div>
        </div>
      </div>
    </footer>
  );
};
