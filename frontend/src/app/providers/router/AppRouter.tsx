import { AdsDetailPage, AdsEditPage, AdsPage } from "@/pages/ads";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ads" replace />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/ads/:id" element={<AdsDetailPage />} />
        <Route path="/ads/:id/edit" element={<AdsEditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
