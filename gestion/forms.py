from django import forms

from .models import Inscripcion
from .models import Operativo


class FormularioInscripcion(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for campo in self.fields.values():
            campo.widget.attrs.setdefault("class", "campo-formulario__control")
        placeholders = {
            "tipo_gestion": "Seleccione tipo de gestión",
            "fecha_calendario": "Seleccione fecha para calendario",
            "letra_binding_case": "Ingrese letra binding case",
            "numero_sipe": "Ingrese número SIPE",
            "numero_mainframe": "Ingrese número mainframe",
            "nombre_establecimiento": "Ingrese nombre del establecimiento",
            "empleador_razon_social": "Ingrese empleador o razón social",
            "cedula_ruc": "Ingrese cédula o R.U.C.",
            "telefono": "Ingrese teléfono",
            "celular": "Ingrese celular",
            "representante_legal": "Ingrese nombre del representante legal",
            "cedula_representante": "Ingrese número de cédula",
            "direccion_establecimiento": "Ingrese dirección del establecimiento",
            "numero_entrevistados": "Ingrese número",
            "monto_salarios": "Ingrese monto",
        }
        for nombre, placeholder in placeholders.items():
            self.fields[nombre].widget.attrs.setdefault("placeholder", placeholder)
        self.fields["tipo_cedula_representante"].empty_label = None

    class Meta:
        model = Inscripcion
        fields = [
            "tipo_gestion",
            "estado_gestion",
            "fecha_calendario",
            "fecha_operacion",
            "tipo_actividad",
            "letra_binding_case",
            "numero_sipe",
            "numero_mainframe",
            "nombre_establecimiento",
            "empleador_razon_social",
            "cedula_ruc",
            "telefono",
            "celular",
            "representante_legal",
            "tipo_cedula_representante",
            "cedula_representante",
            "direccion_establecimiento",
            "numero_entrevistados",
            "monto_salarios",
        ]
        labels = {
            "tipo_gestion": "Tipo de gestión",
            "estado_gestion": "Estado de gestión",
            "fecha_calendario": "Calendario",
            "fecha_operacion": "Fecha de operación",
            "tipo_actividad": "Tipo de actividad",
            "letra_binding_case": "Letra Binding Case",
            "numero_sipe": "No. SIPE",
            "numero_mainframe": "No. Mainframe",
            "nombre_establecimiento": "Nombre del establecimiento",
            "empleador_razon_social": "Empleador o razón social",
            "cedula_ruc": "Cédula / R.U.C.",
            "telefono": "Teléfono",
            "celular": "Celular",
            "representante_legal": "Representante legal",
            "tipo_cedula_representante": "Tipo de cédula",
            "cedula_representante": "Cédula representante legal",
            "direccion_establecimiento": "Dirección del establecimiento",
            "numero_entrevistados": "N° entrevistados",
            "monto_salarios": "Monto en salarios B/.",
        }
        widgets = {
            "estado_gestion": forms.RadioSelect,
            "fecha_calendario": forms.DateInput(
                attrs={"type": "date", "placeholder": "dd/mm/aaaa"}
            ),
            "fecha_operacion": forms.DateInput(
                attrs={"type": "date", "placeholder": "dd/mm/aaaa"}
            ),
            "tipo_actividad": forms.RadioSelect,
        }


class FormularioOperativo(forms.ModelForm):
    class Meta:
        model = Operativo
        exclude = ["creado_en"]
