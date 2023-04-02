import { Menu, MenuItem, View } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { routes } from '../../routing';

export default function NavigationMenu({ signOut }) {
  const navigate = useNavigate();
  return (
    <Menu>
      <MenuItem onClick={() => navigate(routes.uploadPhotos)}>Subir fotos</MenuItem>
      <MenuItem onClick={() => signOut()}>Cerrar sesión</MenuItem>
    </Menu>
  );
}
