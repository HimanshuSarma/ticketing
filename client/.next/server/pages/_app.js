"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./api/buildClient.js":
/*!****************************!*\
  !*** ./api/buildClient.js ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({ req })=>{\n    if (true) {\n        return axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n            // baseURL: `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local`, // this is when you run the client in a k8s deployment\n            baseURL: `http://himanshu123abc.com`,\n            headers: req?.headers\n        });\n    } else {}\n});\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2FwaS9idWlsZENsaWVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEwQjtBQUUxQixpRUFBZSxDQUFDLEVBQUVDLEdBQUcsRUFBRTtJQUNyQixJQUFJLElBQTZCLEVBQUU7UUFDakMsT0FBT0Qsb0RBQVksQ0FBQztZQUNsQixxSUFBcUk7WUFDcklHLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQztZQUNwQ0MsU0FBU0gsS0FBS0c7UUFDaEI7SUFDRixPQUFPLEVBSU47QUFDSCxHQUFFIiwic291cmNlcyI6WyIvaG9tZS9oaW1hbnNodS93b3JrL21pY3Jvc2VydmljZXMvdGlja2V0aW5nL2NsaWVudC9hcGkvYnVpbGRDbGllbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoeyByZXEgfSkgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xuICAgICAgLy8gYmFzZVVSTDogYGh0dHA6Ly9pbmdyZXNzLW5naW54LWNvbnRyb2xsZXIuaW5ncmVzcy1uZ2lueC5zdmMuY2x1c3Rlci5sb2NhbGAsIC8vIHRoaXMgaXMgd2hlbiB5b3UgcnVuIHRoZSBjbGllbnQgaW4gYSBrOHMgZGVwbG95bWVudFxuICAgICAgYmFzZVVSTDogYGh0dHA6Ly9oaW1hbnNodTEyM2FiYy5jb21gLFxuICAgICAgaGVhZGVyczogcmVxPy5oZWFkZXJzXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGF4aW9zLmNyZWF0ZSh7XG4gICAgICBiYXNlVVJMOiBcImh0dHA6Ly9oaW1hbnNodTEyM2FiYy5jb21cIlxuICAgIH0pO1xuICB9ICAgIFxufTsiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXEiLCJjcmVhdGUiLCJiYXNlVVJMIiwiaGVhZGVycyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./api/buildClient.js\n");

/***/ }),

/***/ "(pages-dir-node)/./components/Header.jsx":
/*!*******************************!*\
  !*** ./components/Header.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(pages-dir-node)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({ currentUser })=>{\n    const links = [\n        !currentUser && {\n            label: \"Sign up\",\n            href: \"/auth/signup\"\n        },\n        !currentUser && {\n            label: \"Sign in\",\n            href: \"/auth/signin\"\n        },\n        currentUser && {\n            label: \"Sign out\",\n            href: \"/auth/signout\"\n        }\n    ].filter((link)=>link).map(({ label, href })=>{\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n            className: \"nav-item\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                href: href,\n                children: label\n            }, void 0, false, {\n                fileName: \"/home/himanshu/work/microservices/ticketing/client/components/Header.jsx\",\n                lineNumber: 23,\n                columnNumber: 11\n            }, undefined)\n        }, href, false, {\n            fileName: \"/home/himanshu/work/microservices/ticketing/client/components/Header.jsx\",\n            lineNumber: 19,\n            columnNumber: 9\n        }, undefined);\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        className: \"navbar navbar-light bg-light\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                className: \"navbar-brand\",\n                href: \"/\",\n                children: \"GitTix\"\n            }, void 0, false, {\n                fileName: \"/home/himanshu/work/microservices/ticketing/client/components/Header.jsx\",\n                lineNumber: 32,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"d-flex justify-content-end\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                    className: \"nav d-flex align-items-center\",\n                    children: links\n                }, void 0, false, {\n                    fileName: \"/home/himanshu/work/microservices/ticketing/client/components/Header.jsx\",\n                    lineNumber: 37,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/himanshu/work/microservices/ticketing/client/components/Header.jsx\",\n                lineNumber: 36,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/himanshu/work/microservices/ticketing/client/components/Header.jsx\",\n        lineNumber: 31,\n        columnNumber: 5\n    }, undefined);\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvSGVhZGVyLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBNkI7QUFFN0IsaUVBQWUsQ0FBQyxFQUFFQyxXQUFXLEVBQUU7SUFFN0IsTUFBTUMsUUFBUTtRQUNaLENBQUNELGVBQWU7WUFDZEUsT0FBTztZQUFXQyxNQUFNO1FBQzFCO1FBQ0EsQ0FBQ0gsZUFBZTtZQUNkRSxPQUFPO1lBQVdDLE1BQU07UUFDMUI7UUFDQUgsZUFBZTtZQUNiRSxPQUFPO1lBQVlDLE1BQU07UUFDM0I7S0FDRCxDQUNFQyxNQUFNLENBQUNDLENBQUFBLE9BQVFBLE1BQ2ZDLEdBQUcsQ0FBQyxDQUFDLEVBQUVKLEtBQUssRUFBRUMsSUFBSSxFQUFFO1FBQ25CLHFCQUNFLDhEQUFDSTtZQUVDQyxXQUFXO3NCQUVYLDRFQUFDVCxrREFBSUE7Z0JBQUNJLE1BQU1BOzBCQUNURDs7Ozs7O1dBSkVDOzs7OztJQVFYO0lBRUYscUJBQ0UsOERBQUNNO1FBQUlELFdBQVU7OzBCQUNiLDhEQUFDVCxrREFBSUE7Z0JBQUNTLFdBQVU7Z0JBQWVMLE1BQUs7MEJBQUk7Ozs7OzswQkFJeEMsOERBQUNPO2dCQUFJRixXQUFVOzBCQUNiLDRFQUFDRztvQkFBR0gsV0FBVTs4QkFDWFA7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS1gsR0FBRSIsInNvdXJjZXMiOlsiL2hvbWUvaGltYW5zaHUvd29yay9taWNyb3NlcnZpY2VzL3RpY2tldGluZy9jbGllbnQvY29tcG9uZW50cy9IZWFkZXIuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5cbmV4cG9ydCBkZWZhdWx0ICh7IGN1cnJlbnRVc2VyIH0pID0+IHtcblxuICBjb25zdCBsaW5rcyA9IFtcbiAgICAhY3VycmVudFVzZXIgJiYge1xuICAgICAgbGFiZWw6IFwiU2lnbiB1cFwiLCBocmVmOiBcIi9hdXRoL3NpZ251cFwiXG4gICAgfSxcbiAgICAhY3VycmVudFVzZXIgJiYge1xuICAgICAgbGFiZWw6IFwiU2lnbiBpblwiLCBocmVmOiBcIi9hdXRoL3NpZ25pblwiXG4gICAgfSxcbiAgICBjdXJyZW50VXNlciAmJiB7XG4gICAgICBsYWJlbDogXCJTaWduIG91dFwiLCBocmVmOiBcIi9hdXRoL3NpZ25vdXRcIlxuICAgIH1cbiAgXVxuICAgIC5maWx0ZXIobGluayA9PiBsaW5rKVxuICAgIC5tYXAoKHsgbGFiZWwsIGhyZWYgfSkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGxpIFxuICAgICAgICAgIGtleT17aHJlZn1cbiAgICAgICAgICBjbGFzc05hbWU9e1wibmF2LWl0ZW1cIn1cbiAgICAgICAgPlxuICAgICAgICAgIDxMaW5rIGhyZWY9e2hyZWZ9PlxuICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgPC9saT5cbiAgICAgIClcbiAgICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1saWdodCBiZy1saWdodFwiPlxuICAgICAgPExpbmsgY2xhc3NOYW1lPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cIi9cIj5cbiAgICAgICAgR2l0VGl4XG4gICAgICA8L0xpbms+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1lbmRcIj5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAge2xpbmtzfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9uYXY+XG4gICk7XG59OyJdLCJuYW1lcyI6WyJMaW5rIiwiY3VycmVudFVzZXIiLCJsaW5rcyIsImxhYmVsIiwiaHJlZiIsImZpbHRlciIsImxpbmsiLCJtYXAiLCJsaSIsImNsYXNzTmFtZSIsIm5hdiIsImRpdiIsInVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/Header.jsx\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ \"(pages-dir-node)/./node_modules/bootstrap/dist/css/bootstrap.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _api_buildClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/buildClient */ \"(pages-dir-node)/./api/buildClient.js\");\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Header */ \"(pages-dir-node)/./components/Header.jsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_buildClient__WEBPACK_IMPORTED_MODULE_2__]);\n_api_buildClient__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nconst AppComponent = ({ Component, pageProps })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                currentUser: pageProps?.currentUser\n            }, void 0, false, {\n                fileName: \"/home/himanshu/work/microservices/ticketing/client/pages/_app.js\",\n                lineNumber: 8,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/home/himanshu/work/microservices/ticketing/client/pages/_app.js\",\n                lineNumber: 9,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true);\n};\nAppComponent.getInitialProps = async (context)=>{\n    try {\n        const response = await (0,_api_buildClient__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(context?.ctx).get(`/api/users/currentuser`);\n        let pageProps = {};\n        if (context?.Component?.getInitialProps) {\n            pageProps = await context.Component.getInitialProps(context.ctx);\n        }\n        return {\n            pageProps,\n            ...response?.data\n        } || {};\n    } catch (err) {\n        console.log(err, \"getInitialPropsError\");\n        return err?.response?.data || {};\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppComponent);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDRztBQUNIO0FBRTFDLE1BQU1FLGVBQWUsQ0FBQyxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUM1QyxxQkFDRTs7MEJBQ0UsOERBQUNILDBEQUFNQTtnQkFBQ0ksYUFBYUQsV0FBV0M7Ozs7OzswQkFDaEMsOERBQUNGO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7O0FBRzlCO0FBRUFGLGFBQWFJLGVBQWUsR0FBRyxPQUFPQztJQUNwQyxJQUFJO1FBQ0YsTUFBTUMsV0FBVyxNQUFNUiw0REFBV0EsQ0FBQ08sU0FBU0UsS0FBS0MsR0FBRyxDQUNsRCxDQUFDLHNCQUFzQixDQUFDO1FBRzFCLElBQUlOLFlBQVksQ0FBQztRQUNqQixJQUFJRyxTQUFTSixXQUFXRyxpQkFBaUI7WUFDdkNGLFlBQVksTUFBTUcsUUFBUUosU0FBUyxDQUFDRyxlQUFlLENBQUNDLFFBQVFFLEdBQUc7UUFDakU7UUFFQSxPQUFPO1lBQ0xMO1lBQ0EsR0FBR0ksVUFBVUcsSUFBSTtRQUNuQixLQUFLLENBQUM7SUFDUixFQUFFLE9BQU9DLEtBQUs7UUFDWkMsUUFBUUMsR0FBRyxDQUFDRixLQUFLO1FBQ2pCLE9BQU9BLEtBQUtKLFVBQVVHLFFBQVEsQ0FBQztJQUNqQztBQUVGO0FBR0EsaUVBQWVULFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIi9ob21lL2hpbWFuc2h1L3dvcmsvbWljcm9zZXJ2aWNlcy90aWNrZXRpbmcvY2xpZW50L3BhZ2VzL19hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3NcIjtcbmltcG9ydCBidWlsZENsaWVudCBmcm9tIFwiLi4vYXBpL2J1aWxkQ2xpZW50XCI7XG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuLi9jb21wb25lbnRzL0hlYWRlclwiO1xuXG5jb25zdCBBcHBDb21wb25lbnQgPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxIZWFkZXIgY3VycmVudFVzZXI9e3BhZ2VQcm9wcz8uY3VycmVudFVzZXJ9IC8+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC8+XG4gIClcbn1cblxuQXBwQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIChjb250ZXh0KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBidWlsZENsaWVudChjb250ZXh0Py5jdHgpLmdldChcbiAgICAgIGAvYXBpL3VzZXJzL2N1cnJlbnR1c2VyYFxuICAgICk7XG5cbiAgICBsZXQgcGFnZVByb3BzID0ge307XG4gICAgaWYgKGNvbnRleHQ/LkNvbXBvbmVudD8uZ2V0SW5pdGlhbFByb3BzKSB7XG4gICAgICBwYWdlUHJvcHMgPSBhd2FpdCBjb250ZXh0LkNvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMoY29udGV4dC5jdHgpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwYWdlUHJvcHMsXG4gICAgICAuLi5yZXNwb25zZT8uZGF0YVxuICAgIH0gfHwge307XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVyciwgXCJnZXRJbml0aWFsUHJvcHNFcnJvclwiKTtcbiAgICByZXR1cm4gZXJyPy5yZXNwb25zZT8uZGF0YSB8fCB7fTtcbiAgfVxuICBcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQXBwQ29tcG9uZW50OyJdLCJuYW1lcyI6WyJidWlsZENsaWVudCIsIkhlYWRlciIsIkFwcENvbXBvbmVudCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImN1cnJlbnRVc2VyIiwiZ2V0SW5pdGlhbFByb3BzIiwiY29udGV4dCIsInJlc3BvbnNlIiwiY3R4IiwiZ2V0IiwiZGF0YSIsImVyciIsImNvbnNvbGUiLCJsb2ciXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/bootstrap"], () => (__webpack_exec__("(pages-dir-node)/./pages/_app.js")));
module.exports = __webpack_exports__;

})();