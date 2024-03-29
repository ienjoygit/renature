/* eslint-disable react-hooks/rules-of-hooks */

import * as path from 'path';

import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useBasepath } from 'react-static';
import { Link, useLocation } from 'react-router-dom';
import { FeaturedBadge } from 'formidable-oss-badges';
import { useMarkdownTree, useMarkdownPage } from 'react-static-plugin-md-pages';

import {
  SidebarNavItem,
  SidebarNavSubItem,
  SidebarNavSubItemWrapper,
  SidebarContainer,
  SidebarWrapper,
  SidebarStripes,
  ChevronItem,
} from './navigation';

const HeroLogoLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(p) => p.theme.spacing.sm};
  align-self: center;
`;

const HeroLogo = styled.div`
  display: none;
  width: ${(p) => p.theme.layout.logo};
  height: ${(p) => p.theme.layout.logo};

  @media ${(p) => p.theme.media.sm} {
    display: block;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${(p) => p.theme.spacing.xs};
  padding-bottom: ${(p) => p.theme.spacing.lg};
`;

export const relative = (from, to) => {
  if (!from || !to) return null;
  let [toPath, hash] = to.split('#');
  let pathname = path.relative(path.dirname(from), toPath);
  if (!pathname)
    pathname = path.join(path.relative(from, toPath), path.basename(toPath));
  if (from.endsWith('/')) pathname = '../' + pathname + '/';
  if (!pathname.endsWith('/')) pathname += '/';
  if (hash) pathname += `#${hash}`;
  return { pathname };
};

export const SidebarStyling = ({ children, sidebarOpen, closeSidebar }) => {
  const basepath = useBasepath() || '';
  const homepage = basepath ? `/${basepath}/` : '/';

  return (
    <>
      <SidebarStripes />
      <SidebarContainer hidden={!sidebarOpen} onClick={closeSidebar}>
        <SidebarWrapper>
          <HeroLogoLink to={homepage}>
            <HeroLogo>
              <FeaturedBadge isHoverable name="renature" />
            </HeroLogo>
          </HeroLogoLink>
          <ContentWrapper>{children}</ContentWrapper>
        </SidebarWrapper>
      </SidebarContainer>
    </>
  );
};

SidebarStyling.propTypes = {
  children: PropTypes.node,
  sidebarOpen: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

const GALLERY_CHILD = [
  {
    children: undefined,
    frontmatter: {
      title: 'Gallery',
    },
    key: 'gallery',
    originalPath: 'gallery',
    path: 'gallery',
  },
];

const Sidebar = (props) => {
  const location = useLocation();
  const currentPage = useMarkdownPage();
  const tree = useMarkdownTree();

  const sidebarItems = useMemo(() => {
    if (!currentPage || !tree || !tree.children || !location) {
      return null;
    }

    const pathname = location.pathname.endsWith('/')
      ? currentPage.path + '/'
      : currentPage.path;

    let children = tree.children;
    if (tree.frontmatter && tree.originalPath) {
      children = [{ ...tree, children: undefined }, ...children];
    }

    return children.concat(GALLERY_CHILD).map((page) => {
      const pageChildren = page.children || [];

      const isActive = pageChildren.length
        ? currentPage.path.startsWith(page.path)
        : currentPage.path === page.path;

      return (
        <Fragment key={page.key}>
          <SidebarNavItem
            to={relative(pathname, page.path)}
            isActive={() => isActive}
          >
            {page.frontmatter.title}
            {pageChildren.length ? <ChevronItem /> : null}
          </SidebarNavItem>

          {pageChildren.length && isActive ? (
            <SidebarNavSubItemWrapper>
              {pageChildren.map((childPage) => (
                <SidebarNavSubItem
                  isActive={() => childPage.path === currentPage.path}
                  to={relative(pathname, childPage.path)}
                  key={childPage.key}
                >
                  {childPage.frontmatter.title}
                </SidebarNavSubItem>
              ))}
            </SidebarNavSubItemWrapper>
          ) : null}
        </Fragment>
      );
    });
  }, [currentPage, tree, location]);

  return <SidebarStyling {...props}>{sidebarItems}</SidebarStyling>;
};

export default Sidebar;
