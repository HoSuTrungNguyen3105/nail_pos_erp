import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../ui/ImageWithBasePath';
import { Settings } from 'lucide-react';

const ThemeSettings = () => {
  const dispatch = useDispatch();
const containerRef = useRef<HTMLDivElement | null>(null);

  const [show, setShow] = useState(false);
  const [layoutColor, setlayoutColor] = useState(
    localStorage.getItem('colorschema') || 'light_mode',
  );

  const [layoutView, setLayoutView] = useState(
    localStorage.getItem('layoutStyling') || 'default',
  );

  const [layoutTheme, setLayoutTheme] = useState(
    localStorage.getItem('layoutThemeColors') || 'light',
  );

  const [forceUpdate, setForceUpdate] = useState(0);

  const centerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '8px',
    width: '100%',
  };

  const thumbStyle = {
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
    width: '120px',
    height: '80px',
    objectFit: 'cover',
  };

  const showSettings = () => {
    setShow(!show);
  };

  const DefaultStyle = () => {
    localStorage.setItem('layoutStyling', 'default');
    setLayoutView('default');
    document.documentElement.setAttribute('data-layout-style', 'default');
    setForceUpdate((prev) => prev + 1);
  };

  const HorizontalLayout = () => {
    localStorage.setItem('layoutStyling', 'horizontal');
    setLayoutView('horizontal');
    document.documentElement.setAttribute(
      'data-layout-style',
      'horizontal',
    );
    setForceUpdate((prev) => prev + 1);
  };

  const ResetData = () => {
    localStorage.setItem('colorschema', 'light_mode');
    localStorage.setItem('layoutStyling', 'default');
    localStorage.setItem('layoutThemeColors', 'light');

    setlayoutColor('light_mode');
    setLayoutView('default');
    setLayoutTheme('light');
    // dispatch(setLayoutChange('default'));

    document.documentElement.setAttribute('data-layout-mode', 'light_mode');
    document.documentElement.setAttribute('data-layout-style', 'default');
    document.documentElement.setAttribute('data-nav-color', 'light');

    setForceUpdate((prev) => prev + 1);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-layout-mode', layoutColor);
    document.documentElement.setAttribute('data-layout-style', layoutView);
    document.documentElement.setAttribute('data-nav-color', layoutTheme);

    // Force re-render của các components khác
    window.dispatchEvent(
      new CustomEvent('layoutChange', {
        detail: { layoutView, layoutColor, layoutTheme },
      }),
    );
  }, [layoutColor, layoutTheme, layoutView]);

  // Handle click outside to close theme panel
  useEffect(() => {
    if (!show) return;

    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        console.log('CLICK OUTSIDE');
        setShow(false);
      }
    };
    console.log('handleClickOutside', handleClickOutside)
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div
      ref={containerRef}
      key={`theme-${layoutView}-${layoutColor}-${layoutTheme}-${forceUpdate}`}
    >
      <div
        className="customizer-links"
        id="setdata"
        style={{ background: '#0AE6FD' }}
      >
        <ul className="sticky-sidebar">
          <li className="sidebar-icons" onClick={showSettings}>
            <Link
              to="#"
              className="navigation-add"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-original-title="Theme"
            >
              <Settings className="feather-five" />
            </Link>
          </li>
        </ul>
      </div>

      <div
        className={
          show
            ? 'sidebar-settings nav-toggle show-settings'
            : 'sidebar-settings nav-toggle'
        }
        onClick={(e) => {
          e.preventDefault();
          showSettings();
        }}
      >
        <div className="sidebar-content sticky-sidebar-one">
          <div className="sidebar-header">
            <div className="sidebar-theme-title">
              <h5>
              Theme Customizer
              </h5>
              <p>
               Customize & Preview in Real Time
              </p>
            </div>
            <div className="close-sidebar-icon d-flex">
              <Link
                className="sidebar-refresh me-2"
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  ResetData();
                }}
              >
                ⟳
              </Link>
              <Link
                className="sidebar-close"
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  showSettings();
                }}
              >
                X
              </Link>
            </div>
          </div>
          <div className="sidebar-body p-0">
            <div id="theme_color">
              <div className="theme-mode mb-0">
                <div className="theme-body-main">
                  <div className="theme-mode border-0">
                    <div className="theme-mode border-0 mb-0">
                      <div
                        className="theme-head"
                        style={{
                          marginBottom: '20px',
                          padding: '15px',
                          background:
                            'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                          borderRadius: '10px',
                          border: '1px solid #dee2e6',
                        }}
                      >
                        <h6
                          style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#495057',
                            marginBottom: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          Layout Mode'
                        </h6>
                        <p
                          style={{
                            fontSize: '13px',
                            color: '#6c757d',
                            marginBottom: '0',
                          }}
                        >
                        'Select the primary layout style for your app.'
                        </p>
                      </div>
                      <div className="row">
                        <div className="col-xl-6 ere">
                          <div
                            className="layout-wrap"
                            style={{
                              padding: '10px',
                              borderRadius:
                                '12px',
                              border:
                                layoutView ===
                                  'default'
                                  ? '2px solid #007bff'
                                  : '2px solid #e9ecef',
                              transition:
                                'all 0.3s ease',
                              cursor: 'pointer',
                              boxShadow:
                                layoutView ===
                                  'default'
                                  ? '0 4px 12px rgba(0,123,255,0.15)'
                                  : 'none',
                            }}
                          >
                            <div className="d-flex align-items-center">
                              <div
                                className="status-toggle d-flex align-items-center me-2"
                                onClick={(
                                  e,
                                ) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  DefaultStyle();
                                }}
                              >
                                <input
                                  type="radio"
                                  name="layout"
                                  id="default_layout"
                                  className="check layout-mode"
                                  defaultValue="default"
                                  checked={
                                    layoutView ===
                                    'default'
                                  }
                                  onChange={() => { }}
                                />
                                <label
                                  htmlFor="default_layout"
                                  className="checktoggles"
                                >
                                  <div
                                    // style={
                                    //   centerStyle
                                    // }
                                  >
                                    <ImageWithBasePath
                                      src="assets/img/theme/layout-ltr.png"
                                      alt="img"
                                    //   style={
                                    //     centerStyle
                                    //   }
                                      onMouseEnter={(
                                        e,
                                      ) => {
                                        const target = e.target as HTMLElement;
                                        target.style.transform =
                                          'scale(1.02)';
                                        target.style.boxShadow =
                                          '0 8px 24px rgba(0,123,255,0.2)';
                                        target.style.borderColor =
                                          '#007bff';
                                      }}
                                      onMouseLeave={(
                                        e,
                                      ) => {
                                        const target = e.target as HTMLElement;
                                        target.style.transform =
                                          'scale(1)';
                                        target.style.boxShadow =
                                          '0 4px 16px rgba(0,0,0,0.12)';
                                        target.style.borderColor =
                                          'transparent';
                                      }}
                                    />
                                    <span className="theme-name">
                                      {/* {i18n.language ===
                                        'vi'
                                        ? 'Mặc Định'
                                        : 'Default'} */}
                                    </span>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                       
                       
                        <div className="col-xl-6 ere">
                          <div
                            className="layout-wrap"
                            style={{
                              padding: '10px',
                              borderRadius:
                                '12px',
                              border:
                                layoutView ===
                                  'horizontal'
                                  ? '2px solid #17a2b8'
                                  : '2px solid #e9ecef',
                              transition:
                                'all 0.3s ease',
                              cursor: 'pointer',
                              boxShadow:
                                layoutView ===
                                  'horizontal'
                                  ? '0 4px 12px rgba(23,162,184,0.15)'
                                  : 'none',
                            }}
                          >
                            <div className="d-flex align-items-center">
                              <div
                                className="status-toggle d-flex align-items-center me-2"
                                onClick={(
                                  e,
                                ) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  HorizontalLayout();
                                }}
                              >
                                <input
                                  type="radio"
                                  name="layout"
                                  id="horizontal_layout"
                                  className="check layout-mode"
                                  defaultValue="horizontal"
                                  checked={
                                    layoutView ===
                                    'horizontal'
                                  }
                                  onChange={() => { }}
                                />
                                <label
                                  htmlFor="horizontal_layout"
                                  className="checktoggles"
                                >
                                  <div
                                    // style={
                                    //   centerStyle
                                    // }
                                  >
                                    <ImageWithBasePath
                                      src="assets/img/theme/layout-01.png"
                                      alt="img"
                                    //   style={
                                    //     centerStyle
                                    //   }
                                      onMouseEnter={(
                                        e,
                                      ) => {
                                        const target = e.target as HTMLElement;
                                        target.style.transform =
                                          'scale(1.02)';
                                        target.style.boxShadow =
                                          '0 8px 24px rgba(23,162,184,0.2)';
                                        target.style.borderColor =
                                          '#17a2b8';
                                      }}
                                      onMouseLeave={(
                                        e,
                                      ) => {
                                        const target = e.target as HTMLElement;
                                        target.style.transform =
                                          'scale(1)';
                                        target.style.boxShadow =
                                          '0 4px 16px rgba(0,0,0,0.12)';
                                        target.style.borderColor =
                                          'transparent';
                                      }}
                                    />
                                    <span className="theme-name">
                                      {/* {i18n.language ===
                                        'vi'
                                        ? 'Ngang'
                                        : 'Horizontal'} */}
                                    </span>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sidebar-footer">
                  <div className="footer-preview-btn">
                    <button
                      type="button"
                      className="btn btn-secondary w-100"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        ResetData();
                      }}
                    >
                      {/* {i18n.language === 'vi'
                        ? 'Đặt Lại'
                        : 'Reset'} */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;