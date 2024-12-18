"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { LightMode, DarkMode, Menu, Close } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { UserProvider, useUser } from "@/context/UserContext"; // Importação corrigida
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, loading } = useUser();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Header */}
      <AppBar position="fixed" sx={{ backgroundColor: "#552E89" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            {isSidebarOpen ? <Close /> : <Menu />}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Meninas Digitais
          </Typography>
          {!loading && user ? (
            <Box sx={{ textAlign: "right", mr: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {user.name || "Sem Nome"}
              </Typography>
              <Typography variant="body2">{user.email}</Typography>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ mr: 2 }}>
              Carregando...
            </Typography>
          )}
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
        <Box sx={{ width: 250, backgroundColor: "#772B8C", height: "100%" }}>
          <Typography
            variant="h6"
            sx={{ color: "#FFFFFF", textAlign: "center", py: 2 }}
          >
            Meninas Digitais
          </Typography>
          <List>
            {/* Link para Eventos */}
            <ListItem button component={Link} href="/eventos">
              <ListItemText primary="Eventos" sx={{ color: "#FFFFFF" }} />
            </ListItem>

            {/* Link para Sobre */}
            <ListItem button component={Link} href="/sobre">
              <ListItemText primary="Sobre" sx={{ color: "#FFFFFF" }} />
            </ListItem>

            {/* Link para Gerenciar Usuários - Apenas Admin */}
            {user?.role === "admin" && (
              <ListItem button component={Link} href="/users">
                <ListItemText
                  primary="Gerenciar Usuários"
                  sx={{ color: "#FFFFFF" }}
                />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          backgroundColor: "#FFFFFF",
          color: "#0D0D0D",
        }}
      >
        {/* UserProvider para fornecer o contexto global do usuário */}
        <AppRouterCacheProvider>
          <UserProvider>
            <Header />
            {/* Main Content */}
            <Box sx={{ pt: 8, px: 2, minHeight: "100vh" }}>{children}</Box>
            {/* Footer */}
            <Box
              component="footer"
              sx={{
                textAlign: "center",
                py: 2,
                backgroundColor: "#C18B95",
                color: "#0D0D0D",
                margin: 0,
              }}
            >
              <Typography variant="body2">
                © 2024 Meninas Digitais. Todos os direitos reservados.
              </Typography>
            </Box>
          </UserProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
