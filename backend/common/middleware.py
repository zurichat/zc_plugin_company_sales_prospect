from django.middleware.csrf import CsrfViewMiddleware


class CustomCsrfViewMiddleware(CsrfViewMiddleware):
    """[summary]

    Args:
        CsrfViewMiddleware ([type]): [description]
    """

    def process_view(self, request):
        """[summary]

        Args:
            request ([type]): [description]
            callback (function): [description]
            callback_args ([type]): [description]
            callback_kwargs ([type]): [description]

        Returns:
            [type]: [description]
        """
        return self._accept(request)
