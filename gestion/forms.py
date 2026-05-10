from django import forms

from .models import Inscripcion


class FormularioInscripcion(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for campo in self.fields.values():
            campo.widget.attrs.setdefault("class", "campo-formulario__control")

    class Meta:
        model = Inscripcion
        fields = [
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
            "fecha_operacion": forms.DateInput(attrs={"type": "date"}),
            "tipo_actividad": forms.RadioSelect,
        }
